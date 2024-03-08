import {
  AnalysisStatistics,
  EngineResults,
} from "../../containers/AnalysisPage/types";

export interface Props {
  url: string | null;
  analysisStatistics: AnalysisStatistics;
  areAnalysisStatisticsLoading: boolean;
  engineResultsList: EngineResults[];
  areEngineResultsLoading: boolean;
}

export interface AnalysisStatisticsCardProps {
  analysisStatistics: AnalysisStatistics;
  areAnalysisStatisticsLoading: boolean;
}

export interface EngineResultsTableProps {
  engineResultsList: EngineResults[];
  areEngineResultsLoading: boolean;
}

export interface EngineResultsTableColumn {
  label: string;
  dataKey: keyof EngineResults;
}
