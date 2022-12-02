import { createTheme } from "@mui/material";
import { fontFamily } from "@mui/system";


interface PaletteColor { 
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
  }


export const theme = createTheme({
  palette: {
    primary: {
      main: "#2E979A",
    },
    secondary: {
      main: "#aedcc0",
      light: "#e7f9ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontFamily: "Gill Sans",
      lineHeight: 1.4
    },
    h1: {
      fontSize: 64,
      fontWeight: 400,
      fontFamily: "Gill Sans",
    },

    h4: {
      fontFamily: "Gill Sans",
      fontSize: 28
    },

    h6: {
      fontFamily: "Gill Sans",
      fontSize: "18px",
    },
    body1: {
      fontSize: "16px",
      color: "white"
    },
    body2: {
      fontSize: "14px",
      color: 'white'
    },
    caption: {
      lineHeight: 0.5,
      textAlign: "center",
    },
    fontFamily: "Gill Sans",
  },
});