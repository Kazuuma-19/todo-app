/// <reference types="vitest" />
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
      sentryVitePlugin({
        org: "kazuuma",
        project: "todo-app-frontend",
        authToken: env.SENTRY_AUTH_TOKEN,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      globals: true, //　test, expectなどのimportが不要に
      environment: "happy-dom",
      setupFiles: "./src/testing/setup.ts",
      env: {
        VITE_BACKEND_API_URL: "http://localhost:8080", // テスト用の環境変数
      },
      coverage: {
        // you can include other reporters, but 'json-summary' is required, json is recommended
        reporter: ["text", "json-summary", "json", "lcov"],
        // If you want a coverage reports even if your tests are failing, include the reportOnFailure option
        reportOnFailure: true,
      },
    },
  };
});
