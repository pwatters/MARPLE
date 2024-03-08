export class AnalysisStatistics {
  malicious = 0;
  suspicious = 0;
  undetected = 0;
  harmless = 0;
  timeout = 0;
}

export interface EngineResults {
  engineName: string;
  method: string;
  category: string;
  result: string;
}
