import { AppBar, Container, Toolbar, Typography } from "@mui/material";

const Footer = () => (
  <AppBar
    position="static"
    sx={{ top: "auto", bottom: 0, mt: 5 }}
    component="footer"
  >
    <Container maxWidth="md">
      <Toolbar>
        <Typography variant="body1">
          © {new Date().getFullYear()} Cyberstronomy | Holmesglen
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Footer;
