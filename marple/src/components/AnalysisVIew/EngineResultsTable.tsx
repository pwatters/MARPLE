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
  Theme,
} from "@mui/material";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { EngineResultsTableColumn, EngineResultsTableProps } from "./types";
import { EngineResults } from "../../containers/AnalysisPage/types";

const EngineResultsTable = ({
  engineResultsList,
  areEngineResultsLoading,
}: EngineResultsTableProps) => {
  const columns: EngineResultsTableColumn[] = [
    { label: "Engine Name", dataKey: "engineName" },
    { label: "Method", dataKey: "method" },
    { label: "Category", dataKey: "category" },
    { label: "Result", dataKey: "result" },
  ];
  const VirtuosoTableComponents: TableComponents<EngineResults> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ minWidth: 500, tableLayout: "fixed" }} />
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
        {areEngineResultsLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length} sx={{ padding: 0 }}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        ) : null}
      </>
    );
  }

  function getRowColor(category: string) {
    if (category === "malicious") {
      return (theme: Theme) => theme.palette.error.main;
    } else if (category === "suspicious") {
      return (theme: Theme) => theme.palette.warning.main;
    } else if (category === "harmless") {
      return (theme: Theme) => theme.palette.success.main;
    } else {
      return "inherit";
    }
  }

  function rowContent(_index: number, row: EngineResults) {
    return columns.map((column) => (
      <TableCell
        key={column.dataKey}
        sx={{ color: getRowColor(row[column.dataKey]) }}
      >
        {row[column.dataKey]}
      </TableCell>
    ));
  }

  function sortByCategory(engineResultsList: EngineResults[]): EngineResults[] {
    const categoryPriority: { [category: string]: number } = {
      malicious: 1,
      suspicious: 2,
      harmless: 3,
      undetected: 4,
      timeout: 5,
    };

    return engineResultsList.sort((a, b) => {
      const priorityA = categoryPriority[a.category];
      const priorityB = categoryPriority[b.category];

      return priorityA - priorityB;
    });
  }

  return (
    <Paper style={{ height: "50vh", width: "100%" }}>
      <TableVirtuoso
        data={sortByCategory(engineResultsList)}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default EngineResultsTable;
