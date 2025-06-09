import { useSubmissions } from "./index.hook";
import { Table } from "@root/components/table";

const SubmissionsPage = () => {
  const { columns, data, loading } = useSubmissions();

  return <Table columns={columns ?? []} data={data ?? []} loading={loading} />;
};

export default SubmissionsPage;
