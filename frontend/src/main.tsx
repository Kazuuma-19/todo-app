import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import * as Sentry from "@sentry/react";
import { datadogRum } from "@datadog/browser-rum";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  tracesSampleRate: 0.1, // 10%の確率でトレースを送信
  integrations: [Sentry.browserTracingIntegration()], // どのページでどれくらいの時間を費やしているかを計測
});

datadogRum.init({
  applicationId: "ce5cb8f0-2ea7-49e0-8dd2-c087380f00de",
  clientToken: "pubaad4e9725bb0411cb23b40603f523df8",
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: "ap1.datadoghq.com",
  service: "todo-app-frontend",
  env: "<ENV_NAME>",
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 5,
  defaultPrivacyLevel: "mask-user-input",
});

// Render the app
// biome-ignore lint/style/noNonNullAssertion: tanstack router template
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
