// UI frameworks
import { SearchOutlined } from "@ant-design/icons";
import { Table as AntdTable, Card, Select, Space, Input } from "antd";
// Hooks
import { useTable } from "@root/components/table/index.hook";
// Types
import type { CellItem } from "@root/components/table/index.hook";

interface Props {
  columns: string[];
  loading?: boolean;
  pageSize?: number;
  data: Record<string, CellItem>[];
}

export const Table = ({ columns, data, loading, pageSize = 10 }: Props) => {
  const {
    search,
    visibleColumns,
    data: filteredData,
    columns: columnDefinitions,
    handlers: { setSearch, setVisibleColumns },
  } = useTable(columns, data);

  return (
    <Card className="lg:my-6 sm:[&_.ant-card-body]:p-6 [&_.ant-card-body]:p-4">
      <Space direction="vertical" className="w-full" size="large">
        <Space wrap className="w-full">
          <Select
            mode="multiple"
            maxTagCount={0}
            value={visibleColumns}
            className="min-w-[200px]"
            placeholder="Select columns"
            onChange={setVisibleColumns}
          >
            {columns.map((col) => (
              <Select.Option key={col} value={col}>
                {col}
              </Select.Option>
            ))}
          </Select>

          <Input.Search
            allowClear
            value={search}
            placeholder="Search"
            className="w-[200px]"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Space>

        <AntdTable
          rowKey="id"
          loading={loading}
          dataSource={filteredData}
          columns={columnDefinitions}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize, position: ["bottomCenter"] }}
        />
      </Space>
    </Card>
  );
};
