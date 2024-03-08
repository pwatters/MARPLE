import { useLocation, useParams } from "react-router-dom";
import AnalysisView from "../../components/AnalysisVIew";
import withLayout from "../../HOCs/withLayout";
import { useEffect, useState } from "react";
import { AnalysisStatistics, EngineResults } from "./types";
import Configurations from "../../configurations";
import axios from "axios";

const AnalysisPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const url = queryParams.get("url");

  const [analysisStatistics, setAnalysisStatistics] =
    useState<AnalysisStatistics>(new AnalysisStatistics());
  const [areAnalysisStatisticsLoading, setAreAnalysisStatisticsLoading] =
    useState(false);
  const [engineResultsList, setEngineResultsList] = useState<EngineResults[]>(
    []
  );
  const [areEngineResultsLoading, setAreEngineResultsLoading] = useState(false);

  useEffect(() => {
    const fetchAnalysisStatistics = async () => {
      setAreAnalysisStatisticsLoading(true);
      try {
        const { data }: { data: AnalysisStatistics } = await axios.get(
          `${Configurations.MARPLE_API_URL}/api/analysisStatistics/${id}`
        );
        setAnalysisStatistics(data);
        setAreAnalysisStatisticsLoading(false);
      } catch (err: any) {
        console.log(`Failed to get engine results Error: ${err.response.data}`);
        setAreAnalysisStatisticsLoading(false);
      }
    };

    const fetchEngineResults = async () => {
      setAreEngineResultsLoading(true);
      try {
        const { data }: { data: EngineResults[] } = await axios.get(
          `${Configurations.MARPLE_API_URL}/api/engineResults/${id}`
        );
        setEngineResultsList(data);
        setAreEngineResultsLoading(false);
      } catch (err: any) {
        console.log(`Failed to get engine results Error: ${err.response.data}`);
        setAreEngineResultsLoading(false);
      }
    };

    fetchAnalysisStatistics();
    fetchEngineResults();
  }, []);

  return (
    <AnalysisView
      url={url}
      analysisStatistics={analysisStatistics}
      areAnalysisStatisticsLoading={areAnalysisStatisticsLoading}
      engineResultsList={engineResultsList}
      areEngineResultsLoading={areEngineResultsLoading}
    />
  );
};

export default withLayout(AnalysisPage);
