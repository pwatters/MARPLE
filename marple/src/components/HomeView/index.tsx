import { Box, Container, Typography } from "@mui/material";
import OptionCard from "./OptionsCard";
import { Language, ManageSearch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppRoute from "../../router/routes";

const HomeView = () => {
  const navigate = useNavigate();

  return (
    <Container component="main">
      <Typography variant="h1" color="primary" textAlign="center">
        MARPLE
      </Typography>
      <Typography variant="h2" textAlign="center">
        Holmesglen Student Project
      </Typography>
      <Box
        display="flex"
        gap={5}
        justifyContent="center"
        flexWrap="wrap"
        mt={5}
      >
        <OptionCard
          icon={Language}
          option="Scan URL"
          description="Instantly check any URL for security threats, malicious content, and privacy risks."
          onClick={() => navigate(AppRoute.ScanUrl)}
        />
        {/* <OptionCard
          icon={Dns}
          option="Scan Domain"
          description="Scan any domain for security vulnerabilities, potential privacy issues, and harmful content."
        /> */}
        <OptionCard
          icon={ManageSearch}
          option="View History"
          description="View detailed log of all your scanned URLs and domains"
          onClick={() => navigate(AppRoute.History)}
        />
      </Box>
    </Container>
  );
};

export default HomeView;
