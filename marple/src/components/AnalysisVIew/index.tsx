import { Container, Grid, Typography } from "@mui/material";
import { Props } from "./types";
import AnalysisStatisticsCard from "./AnalysisStatisticsCard";
import EngineResultsTable from "./EngineResultsTable";

const AnalysisView = ({
  url,
  analysisStatistics,
  areAnalysisStatisticsLoading,
  engineResultsList,
  areEngineResultsLoading,
}: Props) => {
  return (
    <Container component="main">
      <Typography variant="h2" textAlign="center" mb={3}>
        Detailed Analysis
      </Typography>
      <Typography variant="h3" textAlign="center" mb={3}>
        {url}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <AnalysisStatisticsCard
            analysisStatistics={analysisStatistics}
            areAnalysisStatisticsLoading={areAnalysisStatisticsLoading}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <EngineResultsTable
            engineResultsList={engineResultsList}
            areEngineResultsLoading={areEngineResultsLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalysisView;
