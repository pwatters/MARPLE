import { Container, Typography } from "@mui/material";
import { Props } from "./types";
import HistoryTable from "./HistoryTable";

const HistoryView = ({ history }: Props) => {
  return (
    <Container component="main">
      <Typography variant="h2" textAlign="center" mb={3}>
        Scan History
      </Typography>
      <HistoryTable history={history} />
    </Container>
  );
};

export default HistoryView;
