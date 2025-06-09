import { useMemo } from "react";
// UI frameworks
import { Table as AntdTable, type TableProps } from "antd";
// Utils
import { textSorter } from "@root/utils/sorter.util";

interface Props {
  columns: string[];
  loading?: boolean;
  pageSize?: number;
  data: Record<string, unknown>[];
}

export const Table = ({ columns, data, loading, pageSize }: Props) => {
  const normalizedColumns = useMemo<TableProps["columns"]>(() => {
    return columns.map((column) => ({
      key: column,
      title: column,
      dataIndex: column,
      sorter: (a, b) => {
        if (typeof a[column] === "string") {
          return textSorter(a[column], b[column]);
        }

        return a[column] - b[column];
      },
    }));
  }, [columns]);

  return (
    <AntdTable
      columns={normalizedColumns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize }}
    />
  );
};
