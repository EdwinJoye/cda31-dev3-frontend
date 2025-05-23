import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ModalsProvider } from "@mantine/modals";
import AppRouter from "./AppRouter";
import "./index.css";
import { mantineCssResolver } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider cssVariablesResolver={mantineCssResolver}>
      <ModalsProvider>
        <Notifications />
        <AppRouter />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
