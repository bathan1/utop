import { Node, Project } from "ts-morph";

const moduleFilePath = process.argv[2];
if (!moduleFilePath) {
  throw new Error("Usage: tsx bin/clear-it.ts <module-path>");
}

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const moduleFile = project.addSourceFileAtPath(moduleFilePath);

for (const _ of moduleFile.getStatements()) {
  const jsDocs = moduleFile
    .getStatements()
    .flatMap(getJsDocs)
    .map((jsDoc) => ({
      start: jsDoc.getStart(),
      end: jsDoc.getEnd(),
      text: jsDoc.getText(),
    }))
    .toSorted((a, b) => b.start - a.start);

  for (const jsDoc of jsDocs) {
    const wiped = wipeExamplesFromJsDoc(jsDoc.text);

    moduleFile.replaceText([jsDoc.start, jsDoc.end], isEmptyJsDoc(wiped) ? "" : wiped);
  }

}
function isEmptyJsDoc(jsDocText: string) {
  return readJsDocBody(jsDocText).trim() === "";
}

moduleFile.saveSync();

function getJsDocs(target: Node) {
  if (Node.isFunctionDeclaration(target)) return target.getJsDocs();
  if (Node.isVariableStatement(target)) return target.getJsDocs();
  if (Node.isExpressionStatement(target)) return target.getJsDocs();

  return [];
}

function wipeExamplesFromJsDoc(jsDocText: string) {
  const body = readJsDocBody(jsDocText);
  const exampleIndex = body.search(/^@example\b/m);
  const brief = (exampleIndex === -1 ? body : body.slice(0, exampleIndex)).trimEnd();

  return makeJsDocFromBody(brief);
}

function readJsDocBody(jsDocText: string) {
  return jsDocText
    .replace(/^\/\*\*\s*\n?/, "")
    .replace(/\n?\s*\*\/$/, "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*\s?/, ""))
    .join("\n")
    .trimEnd();
}

function makeJsDocFromBody(body: string) {
  const lines = body.trimEnd().split("\n");

  return ["/**", ...lines.map((line) => ` * ${line}`), " */"].join("\n");
}
