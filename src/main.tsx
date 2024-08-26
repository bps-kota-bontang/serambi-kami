import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "@/App";
import { BUILD_HASH, MODE } from "@/configs/Constant";
import "./index.css";

Sentry.init({
  dsn: "https://b0d9d202173ea633eb9addca5bce936f@o4507838470094848.ingest.us.sentry.io/4507838474354688",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    Sentry.browserProfilingIntegration(),
  ],
  release: MODE == "production" ? APP_VERSION : BUILD_HASH,
  environment: MODE,
  tracesSampleRate: 1.0,
  tracePropagationTargets:
    MODE === "production"
      ? ["localhost", /^https:\/\/api-serambi\.bpsbontang\.com/]
      : ["localhost", /^https:\/\/staging-api-serambi\.bpsbontang\.com/],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
