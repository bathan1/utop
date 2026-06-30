import { mkdir, readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const docs = new URL("../docs/", import.meta.url);
const readme = await readFile(new URL("README.md", root), "utf8");
const registry = JSON.parse(await readFile(new URL("registry.json", root), "utf8"));
const introduction = readme
  .replace("](./src)", `](${registry.homepage}/tree/main/src)`)
  .replaceAll("](./src/", `](${registry.homepage}/blob/main/src/`);

await mkdir(docs, { recursive: true });
await writeFile(
  new URL("index.md", docs),
  `<!-- Generated from README.md by scripts/prepare-docs.mjs. -->\n\n${introduction}`
);
