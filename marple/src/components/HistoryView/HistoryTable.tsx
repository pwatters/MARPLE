import React from "react";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import convertEpochToDate from "../../utils/epochToDate";
import { HistoryTableColumn, HistoryTableProps } from "./types";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { AnalysisMetadata } from "../../containers/HistoryPage/types";
import { useNavigate } from "react-router-dom";
import AppRoute from "../../router/routes";

const HistoryTable = ({ history, isHistoryLoading }: HistoryTableProps) => {
  const navigate = useNavigate();

  const columns: HistoryTableColumn[] = [
    { label: "URL", dataKey: "url" },
    { label: "Status", dataKey: "status" },
    { label: "Date", dataKey: "date" },
  ];
  const VirtuosoTableComponents: TableComponents<AnalysisMetadata> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow hover {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.dataKey}
              sx={{ fontWeight: "bold", backgroundColor: "background.paper" }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
        {isHistoryLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length} sx={{ padding: 0 }}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        ) : null}
      </>
    );
  }

  function rowContent(_index: number, row: AnalysisMetadata) {
    return columns.map((column) => (
      <TableCell
        key={column.dataKey}
        onClick={handleRowClick(row.analysisId, row.url)}
        sx={{
          cursor: "pointer",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {column.dataKey === "date"
          ? convertEpochToDate(row[column.dataKey])
          : row[column.dataKey]}
      </TableCell>
    ));
  }

  function sortByDate(history: AnalysisMetadata[]) {
    return history.sort((a, b) => b.date - a.date);
  }

  const handleRowClick = (analysisId: string, url: string) => () => {
    navigate(`${AppRoute.History}/${analysisId}?url=${url}`);
  };

  return (
    <Paper style={{ height: "60vh", width: "100%" }}>
      <TableVirtuoso
        data={sortByDate(history)}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default HistoryTable;
