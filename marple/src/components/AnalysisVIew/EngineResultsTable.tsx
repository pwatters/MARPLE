import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { EngineResultsTableColumn, EngineResultsTableProps } from "./types";
import { EngineResults } from "../../containers/AnalysisPage/types";

const EngineResultsTable = ({ engineResultsList }: EngineResultsTableProps) => {
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
    );
  }

  function rowContent(_index: number, row: EngineResults) {
    return columns.map((column) => (
      <TableCell key={column.dataKey}>{row[column.dataKey]}</TableCell>
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
