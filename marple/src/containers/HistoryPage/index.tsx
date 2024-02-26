import { useEffect, useState } from "react";
import withLayout from "../../HOCs/withLayout";
import HistoryView from "../../components/HistoryView";
import axios from "axios";
import Configurations from "../../configurations";
import { AnalysisMetadata } from "./types";

const HistoryPage = () => {
  const [history, setHistory] = useState<AnalysisMetadata[]>([]);

  useEffect(() => {
    const fetchScanHistory = async () => {
      try {
        const { data }: { data: AnalysisMetadata[] } = await axios.get(
          `${Configurations.MARPLE_API_URL}/api/analysisMetadata`
        );
        setHistory(data);
      } catch (err: any) {
        console.log(`Failed to get scan history. Error: ${err.response.data}`);
      }
    };

    fetchScanHistory();
  }, []);

  return <HistoryView history={history} />;
};

export default withLayout(HistoryPage);
