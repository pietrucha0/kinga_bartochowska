// Injects server-rendered HTML into dist/index.html after `vite build`.
// Run via `npm run build`.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist", "index.html");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

const template = await readFile(indexPath, "utf8");
const marker = "<!--app-html-->";
if (!template.includes(marker)) {
  throw new Error(`Prerender marker ${marker} not found in dist/index.html`);
}

await writeFile(indexPath, template.replace(marker, appHtml));
await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`Prerendered ${(appHtml.length / 1024).toFixed(1)} KB of HTML into dist/index.html`);
