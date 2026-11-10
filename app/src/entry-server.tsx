import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";

// Used at build time by scripts/prerender.mjs to bake the page's HTML into
// dist/index.html, so search engines and link previews get real content
// without running JavaScript.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
