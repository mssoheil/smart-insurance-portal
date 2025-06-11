import { useMemo, useState, useEffect } from "react";
// Utils
import { sorter } from "@root/utils/sorter.util";

type SorterItem = Record<string, CellItem>;
export type CellItem = string | number | null;

export function useTable(columns: string[], data: SorterItem[]) {
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  useEffect(() => {
    if (columns.length && visibleColumns.length === 0) {
      setVisibleColumns(columns);
    }
  }, [columns, visibleColumns.length]);

  const filteredData = useMemo(() => {
    if (!search) {
      return data;
    }

    const keyword = search.toLowerCase();

    return data.filter((row) =>
      visibleColumns.some((col) => {
        const value = row[col];
        return value?.toString().toLowerCase().includes(keyword);
      })
    );
  }, [search, visibleColumns, data]);

  const columnDefinitions = useMemo(() => {
    return visibleColumns.map((col) => ({
      key: col,
      title: col,
      dataIndex: col,
      render: (value: CellItem) => value ?? "—",
      sorter: (a: SorterItem, b: SorterItem) => sorter(a[col], b[col]),
    }));
  }, [visibleColumns]);

  return {
    search,
    visibleColumns,
    data: filteredData,
    columns: columnDefinitions,
    handlers: {
      setSearch,
      setVisibleColumns,
    },
  };
}
