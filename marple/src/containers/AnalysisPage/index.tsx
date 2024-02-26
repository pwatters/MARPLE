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
  const [engineResultsList, setEngineResultsList] = useState<EngineResults[]>(
    []
  );

  useEffect(() => {
    const fetchAnalysisStatistics = async () => {
      try {
        const { data }: { data: AnalysisStatistics } = await axios.get(
          `${Configurations.MARPLE_API_URL}/api/analysisStatistics/${id}`
        );
        setAnalysisStatistics(data);
      } catch (err: any) {
        console.log(`Failed to get engine results Error: ${err.response.data}`);
      }
    };

    const fetchEngineResults = async () => {
      try {
        const { data }: { data: EngineResults[] } = await axios.get(
          `${Configurations.MARPLE_API_URL}/api/engineResults/${id}`
        );
        setEngineResultsList(data);
      } catch (err: any) {
        console.log(`Failed to get engine results Error: ${err.response.data}`);
      }
    };

    fetchAnalysisStatistics();
    fetchEngineResults();
  }, []);

  return (
    <AnalysisView
      url={url}
      analysisStatistics={analysisStatistics}
      engineResultsList={engineResultsList}
    />
  );
};

export default withLayout(AnalysisPage);
