import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Configurations from "../../configurations";

const ScanUrlView = () => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleScan = async () => {
    setMessage("");
    try {
      await axios.post(`${Configurations.MARPLE_API_URL}/api/scan/url`, {
        url,
      });
      setMessage("Scan completed!");
    } catch (err: any) {
      setMessage(err.response.data);
    }
  };

  return (
    <Container component="main">
      <Typography variant="h2" textAlign="center" mb={3}>
        Input a URL to scan
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        label="URL"
        autoFocus
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" sx={{ width: 150 }} onClick={handleScan}>
          Scan
        </Button>
      </Box>
      <Typography textAlign="center" mt={3}>
        {message}
      </Typography>
    </Container>
  );
};

export default ScanUrlView;
