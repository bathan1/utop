import { readFileSync } from "node:fs";
import { Converter, ReflectionKind } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

const registry = JSON.parse(readFileSync(new URL("../registry.json", import.meta.url), "utf8"));
const repository = new URL(registry.homepage).pathname.replace(/^\/|\/$/g, "");
const registryItems = new Map(
  registry.items
    .filter(
      (item) =>
        item.type === "registry:lib" && item.name.endsWith(".js") && item.name !== "types.js"
    )
    .map((item) => [item.name.replace(/\.js$/, ""), item])
);
const pages = new Map();

function readDocComment(reflection) {
  const source = reflection.sources?.[0];
  if (!source) return;

  const file = readFileSync(source.fullFileName, "utf8");
  const declarationOffset = file.split("\n", source.line - 1).join("\n").length;
  const beforeDeclaration = file.slice(0, declarationOffset);
  const match = beforeDeclaration.match(/\/\*\*[\s\S]*?\*\//g)?.at(-1);
  if (!match) return;

  return match
    .replace(/^\/\*\*\s?\n?/, "")
    .replace(/\n?\s*\*\/\s*$/, "")
    .split("\n")
    .map((line) => line.replace(/^\s*\* ?/, ""))
    .filter((line) => !line.startsWith("@example"))
    .join("\n")
    .trim()
    .replace(/\{@link\s+([^}|]+?)(?:\s*\|\s*([^}]+))?\}/g, (_, target, label) =>
      (label ?? target).trim()
    );
}

function firstParagraph(markdown) {
  return markdown.split(/\n\s*\n/)[0]?.replaceAll("`", "").trim();
}

function splitFrontmatter(markdown) {
  const match = markdown.match(/^(---\n[\s\S]*?\n---\n\n?)([\s\S]*)$/);
  return match ? { frontmatter: match[1], body: match[2] } : { frontmatter: "", body: markdown };
}

function removePageTitle(markdown) {
  return markdown.replace(/^# .+\n+/, "").trim();
}

function nestHeadings(markdown) {
  return markdown.replace(/^(#{2,5}) /gm, "#$1 ");
}

function functionIndex() {
  const items = [...registryItems.keys()]
    .map((name) => `- [${name}](functions/${name}.md)`)
    .join("\n");

  return `# API Reference\n\n## Functions\n\n${items}`;
}

function importPath(name, item) {
  const source =
    item.files.find((file) => file.path.replace(/^.*\//, "").replace(/\.tsx?$/, "") === name) ??
    item.files[0];

  return source.target.replace(/^@lib(?=\/)/, "@/lib").replace(/\.tsx?$/, "");
}

function addUsage(markdown, name, item) {
  const usage = [
    "## Usage",
    "",
    "```ts",
    `import { ${name} } from "${importPath(name, item)}";`,
    "```",
    "",
    "",
  ].join("\n");
  const heading = /^## Usage[ \t]*\n?/m;

  if (heading.test(markdown)) return markdown.replace(heading, usage);

  const firstHeading = markdown.search(/^## /m);
  if (firstHeading === -1) return `${markdown}\n\n${usage.trim()}`;
  return `${markdown.slice(0, firstHeading)}${usage}${markdown.slice(firstHeading)}`.trim();
}

function addInstallation(markdown, itemName) {
  const installation = [
    "## Installation",
    "",
    "```bash",
    `pnpm dlx shadcn@latest add ${repository}/${itemName}`,
    "```",
    "",
    "",
  ].join("\n");
  const firstHeading = markdown.search(/^## /m);

  if (firstHeading === -1) return `${markdown}\n\n${installation.trim()}`;
  return `${markdown.slice(0, firstHeading)}${installation}${markdown.slice(firstHeading)}`.trim();
}

/** @param {import("typedoc-plugin-markdown").MarkdownApplication} app */
export function load(app) {
  app.converter.on(Converter.EVENT_RESOLVE_END, (context) => {
    const reflections = context.project.getReflectionsByKind(
      ReflectionKind.Function | ReflectionKind.Variable
    );

    for (const reflection of reflections) {
      const item = registryItems.get(reflection.name);
      if (!item) continue;

      const doc = readDocComment(reflection);
      if (!doc) continue;

      pages.set(reflection.id, { doc, item });
      reflection.comment = undefined;
      for (const signature of reflection.signatures ?? []) {
        signature.comment = undefined;
      }
    }
  });

  app.renderer.on(MarkdownPageEvent.BEGIN, (page) => {
    const generatedPage = pages.get(page.model?.id);
    const summary = generatedPage
      ? firstParagraph(generatedPage.doc)
      : page.model?.comment?.summary?.map((part) => part.text).join("").split("\n\n")[0]?.trim();

    page.frontmatter = {
      title: page.model?.name === "utop.js" ? "API Reference" : (page.model?.name ?? "API Reference"),
      ...(summary ? { description: summary } : {}),
      ...page.frontmatter,
    };

    if (page.model?.name === "map") {
      page.url = page.url.replace("variables/map.md", "functions/map.md");
      page.filename = page.filename.replace(/([/\\])variables([/\\])map\.md$/, "$1functions$2map.md");
    }
  });

  app.renderer.on(MarkdownPageEvent.END, (page) => {
    page.contents = page.contents.replaceAll("variables/map.md", "functions/map.md");

    if (page.model?.name === "utop.js") {
      const { frontmatter } = splitFrontmatter(page.contents);
      page.contents = `${frontmatter}${functionIndex()}\n`;
      return;
    }

    const generatedPage = pages.get(page.model?.id);
    if (!generatedPage) return;

    const { frontmatter, body } = splitFrontmatter(page.contents);
    const content = addInstallation(
      addUsage(generatedPage.doc, page.model.name, generatedPage.item),
      generatedPage.item.name
    );
    const reference = nestHeadings(removePageTitle(body));

    page.contents = `${frontmatter}${content}\n\n## API Reference\n\n${reference}\n`;
  });
}
