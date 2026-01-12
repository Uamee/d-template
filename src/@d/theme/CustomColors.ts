import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    onPrimary: Palette["primary"];
    border: Palette["primary"];
  }

  interface PaletteOptions {
    onPrimary?: PaletteOptions["primary"];
    border?: PaletteOptions["primary"];
  }
}
