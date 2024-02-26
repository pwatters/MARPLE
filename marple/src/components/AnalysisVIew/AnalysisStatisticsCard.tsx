import { Card, CardContent, Grid, Typography } from "@mui/material";
import { AnalysisStatisticsCardProps } from "./types";

const AnalysisStatisticsCard = ({
  analysisStatistics,
}: AnalysisStatisticsCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography
          sx={{ fontSize: 18, fontWeight: "bold", mb: 2 }}
          color="text.primary"
          gutterBottom
        >
          Analysis Statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" color="error.main">
              Malicious: {analysisStatistics.malicious}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="warning.main">
              Suspicious: {analysisStatistics.suspicious}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="success.main">
              Harmless: {analysisStatistics.harmless}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Undetected: {analysisStatistics.undetected}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Timeout: {analysisStatistics.timeout}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalysisStatisticsCard;
