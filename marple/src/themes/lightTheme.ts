import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: "clamp(2rem, 10vw, 5rem)",
    },
    h2: {
      fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
    },
    h3: {
      fontSize: "clamp(1rem, 5vw, 2rem)",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

export default lightTheme;
