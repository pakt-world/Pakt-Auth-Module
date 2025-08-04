/**
 * auth-module.js
 * @remarks
 * This test environment uses the PaktAuth component to test the authentication flow.
 */

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { createRoot } from "react-dom/client";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import App from "./app";

const domNode = document.querySelector("#app");

if (domNode) {
    const root = createRoot(domNode);
    root.render(<App />);
} else {
    // eslint-disable-next-line no-console
    console.error("App root element not found!");
}
