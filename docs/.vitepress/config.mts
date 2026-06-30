import { readFileSync } from "node:fs";
import { defineConfig } from "vitepress";

const registry = JSON.parse(
  readFileSync(new URL("../../registry.json", import.meta.url), "utf8")
);
const functions = registry.items
  .filter(
    (item: { name: string; type: string }) =>
      item.type === "registry:lib" && item.name.endsWith(".js") && item.name !== "types.js"
  )
  .map((item: { name: string }) => item.name.replace(/\.js$/, ""));

export default defineConfig({
  title: "utop.js",
  description: "Top-level helpers for JavaScript iterables.",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Introduction", link: "/" },
      { text: "API", link: "/api/" },
    ],
    sidebar: [
      { text: "Introduction", link: "/" },
      {
        text: "Functions",
        collapsed: false,
        items: functions.map((name: string) => ({
          text: name,
          link: `/api/functions/${name}`,
        })),
      },
    ],
    outline: {
      level: [2, 2],
      label: "On this page",
    },
    socialLinks: [{ icon: "github", link: registry.homepage }],
    search: {
      provider: "local",
    },
  },
});
