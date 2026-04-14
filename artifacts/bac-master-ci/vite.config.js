"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var vite_2 = require("@tailwindcss/vite");
var path_1 = require("path");
var vite_plugin_runtime_error_modal_1 = require("@replit/vite-plugin-runtime-error-modal");
var rawPort = process.env.PORT;
var port = rawPort ? Number(rawPort) : 3000;
var basePath = process.env.BASE_PATH || "/";
exports.default = (0, vite_1.defineConfig)({
    base: basePath,
    plugins: __spreadArray([
        (0, plugin_react_1.default)(),
        (0, vite_2.default)(),
        (0, vite_plugin_runtime_error_modal_1.default)()
    ], (process.env.NODE_ENV !== "production" &&
        process.env.REPL_ID !== undefined
        ? [
            await Promise.resolve().then(function () { return require("@replit/vite-plugin-cartographer"); }).then(function (m) {
                return m.cartographer({
                    root: path_1.default.resolve(import.meta.dirname, ".."),
                });
            }),
            await Promise.resolve().then(function () { return require("@replit/vite-plugin-dev-banner"); }).then(function (m) {
                return m.devBanner();
            }),
        ]
        : []), true),
    resolve: {
        alias: {
            "@": path_1.default.resolve(import.meta.dirname, "src"),
            "@assets": path_1.default.resolve(import.meta.dirname, "..", "..", "attached_assets"),
        },
        dedupe: ["react", "react-dom"],
    },
    root: path_1.default.resolve(import.meta.dirname),
    build: {
        outDir: path_1.default.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true,
    },
    server: {
        port: port,
        host: "0.0.0.0",
        allowedHosts: true,
        fs: {
            strict: true,
            deny: ["**/.*"],
        },
    },
    preview: {
        port: port,
        host: "0.0.0.0",
        allowedHosts: true,
    },
});
