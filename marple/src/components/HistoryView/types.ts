import { AnalysisMetadata } from "../../containers/HistoryPage/types";

export interface Props {
  history: AnalysisMetadata[];
  isHistoryLoading: boolean;
}

export interface HistoryTableProps {
  history: AnalysisMetadata[];
  isHistoryLoading: boolean;
}

export interface HistoryTableColumn {
  label: string;
  dataKey: keyof AnalysisMetadata;
}
