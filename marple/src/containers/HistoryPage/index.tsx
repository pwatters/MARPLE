import { useEffect, useState } from "react";
import withLayout from "../../HOCs/withLayout";
import HistoryView from "../../components/HistoryView";
import axios from "axios";
import Configurations from "../../configurations";
import { AnalysisMetadata } from "./types";

const HistoryPage = () => {
  const [history, setHistory] = useState<AnalysisMetadata[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  useEffect(() => {
    const fetchScanHistory = async () => {
      setIsHistoryLoading(true);
      try {
        const { data }: { data: AnalysisMetadata[] } = await axios.get(
          `${Configurations.MARPLE_API_URL}/api/analysisMetadata`
        );
        setHistory(data);
        setIsHistoryLoading(false);
      } catch (err: any) {
        console.log(`Failed to get scan history. Error: ${err.response.data}`);
        setIsHistoryLoading(false);
      }
    };

    fetchScanHistory();
  }, []);

  return <HistoryView history={history} isHistoryLoading={isHistoryLoading} />;
};

export default withLayout(HistoryPage);
