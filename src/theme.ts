import type { CSSVariablesResolver } from "@mantine/core";

export const mantineCssResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--tooltip-bg": theme.colors.blue[4],
  },
  light: {},
  dark: {},
});
