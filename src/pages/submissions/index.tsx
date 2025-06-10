// UI frameworks
import { Empty, Typography } from "antd";
// Hooks
import { useSubmissions } from "./index.hook";
// Shared components
import { Table } from "@root/components/table";

const SubmissionsPage = () => {
  const { columns, data, loading, calledAPiRef } = useSubmissions();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Typography.Title level={3} className="!text-gray-600 !mb-6">
        Submitted Applications
      </Typography.Title>
      {!loading && !data?.length && calledAPiRef.current ? (
        <Empty description="No submissions found" />
      ) : (
        <Table columns={columns ?? []} data={data ?? []} loading={loading} />
      )}
    </div>
  );
};

export default SubmissionsPage;
