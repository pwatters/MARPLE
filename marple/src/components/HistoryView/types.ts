import { AnalysisMetadata } from "../../containers/HistoryPage/types";

export interface Props {
  history: AnalysisMetadata[];
}

export interface HistoryTableProps {
  history: AnalysisMetadata[];
}

export interface HistoryTableColumn {
  label: string;
  dataKey: keyof AnalysisMetadata;
}
