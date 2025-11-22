// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4CC2FF",      // Azul eléctrico suave
    },
    secondary: {
      main: "#A78BFA",      // Violeta elegante
    },
    background: {
      default: "#1E1E1E",   // Fondo estilo VSCode
      paper: "#252526",     // Tarjetas, modals
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#C7C7C7",
    }
  },

  shape: {
    borderRadius: 10, // Bordes modernos tipo desktop
  },

  typography: {
    fontFamily: `"Inter", "Segoe UI", "Roboto", sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 }
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingLeft: 20,
          paddingRight: 20,
          fontWeight: 600
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#1E1E1E",
          borderBottom: "1px solid #2D2D2D",
          boxShadow: "none"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid #2D2D2D",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)"
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.9rem",
          backgroundColor: "#333",
          borderRadius: 6
        }
      }
    }
  }
});

export default theme;
