import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  type ThemeOptions,
} from "@mui/material/styles";
import { useMemo, type ReactNode } from "react";
//import { useTranslation } from "react-i18next";

//import { deDE, enUS, esES, ptBR } from "@mui/material/locale";

// const localeMap = {
//   "pt-BR": ptBR,
//   en: enUS,
//   de: deDE,
//   "es-ES": esES,
// };

interface ThemeProviderProps {
  children: ReactNode;
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#013c88",
    },
    onPrimary: {
      main: "#FFFF",
    },
    secondary: {
      main: "#5e5e5e",
      light: "#d7d7d7",
    },
    background: {
      default: "#FFFF",
      paper: "#e8eef5",
    },
    border: {
      main: "#e2e2e2",
    },
    text: {
      primary: "#585759",
      secondary: "#737373",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  transitions: {
    duration: {
      standard: 300,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  typography: {
    fontFamily: [
      "Metropolis",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  //const { i18n } = useTranslation();
  //const currentLanguage = i18n.language;

  const theme = useMemo(
    () => {
      //const locale = localeMap[currentLanguage as keyof typeof localeMap] || enUS;

      return createTheme(
        themeOptions
        //, locale
      );
    },
    [
      //currentLanguage
    ]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
