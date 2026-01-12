// import * as Sentry from "@sentry/react";

// const isDev = process.env.NODE_ENV === "development";

// export const Logger = {
//   init: () => {
//     if (!isDev) {
//       Sentry.init({
//         dsn: "https://1fcd553d2323cfe9b212dc9c70a167ed@o4510433211580416.ingest.us.sentry.io/4510433215905792",
//         integrations: [
//           Sentry.browserTracingIntegration(),
//           Sentry.replayIntegration(),
//         ],
//         tracesSampleRate: 1.0,
//       });
//     }
//   },

//   error: (message: string, error?: unknown, context?: Record<string, any>) => {
//     console.error(`🔴 [${message}]`, error);

//     if (!isDev) {
//       Sentry.withScope((scope) => {
//         if (context) scope.setContext("context", context);
//         Sentry.captureException(error);
//       });
//     }
//   },

//   info: (message: string) => {
//     console.log(`🔵 [INFO] ${message}`);
//     if (!isDev) {
//       Sentry.addBreadcrumb({ message, level: "info" });
//     }
//   },
// };
