import {
  AnalysisStatistics,
  EngineResults,
} from "../../containers/AnalysisPage/types";

export interface Props {
  url: string | null;
  analysisStatistics: AnalysisStatistics;
  engineResultsList: EngineResults[];
}

export interface AnalysisStatisticsCardProps {
  analysisStatistics: AnalysisStatistics;
}

export interface EngineResultsTableProps {
  engineResultsList: EngineResults[];
}

export interface EngineResultsTableColumn {
  label: string;
  dataKey: keyof EngineResults;
}
