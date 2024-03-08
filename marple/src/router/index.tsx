import { createBrowserRouter } from "react-router-dom";
import HomePage from "../containers/HomePage";
import ScanUrlPage from "../containers/ScanUrlPage";
import AppRoute from "./routes";
import HistoryPage from "../containers/HistoryPage";
import AnalysisPage from "../containers/AnalysisPage";

const router = createBrowserRouter([
  {
    path: AppRoute.Home,
    element: <HomePage />,
  },
  {
    path: AppRoute.ScanUrl,
    element: <ScanUrlPage />,
  },
  {
    path: AppRoute.History,
    element: <HistoryPage />,
  },
  {
    path: `${AppRoute.History}/:id`,
    element: <AnalysisPage />,
  },
]);

export default router;
