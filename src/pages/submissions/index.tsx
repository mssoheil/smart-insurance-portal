// UI frameworks
import { Empty } from "antd";
// Hooks
import { useSubmissions } from "./index.hook";
// Shared components
import { Table } from "@root/components/table";

const SubmissionsPage = () => {
  const { columns, data, loading, calledAPiRef } = useSubmissions();

  return (
    <div className="mx-auto max-w-[90vw] lg:max-w-[80vw] my-2 lg:my-4">
      <h3 className="text-xl font-bold mb-4">Submitted Applications</h3>
      {!loading && !data?.length && calledAPiRef.current ? (
        <Empty description="No submissions found" />
      ) : (
        <Table columns={columns ?? []} data={data ?? []} loading={loading} />
      )}
    </div>
  );
};

export default SubmissionsPage;
