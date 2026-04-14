import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Intercept window.fetch to automatically inject the JWT token for API requests
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
    const urlString = input.toString();
    // Only intercept calls to our backend API
    if (urlString.startsWith('/api') || urlString.startsWith('api/')) {
        const token = localStorage.getItem('bac_token');
        if (token) {
            init = init || {};
            const headers = new Headers(init.headers);
            if (!headers.has('Authorization')) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            init.headers = headers;
        }
    }
    return originalFetch(input, init);
};
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
