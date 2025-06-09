import { useCallback, useEffect, useState } from "react";
// Services
import InsuranceService from "@root/services/http/insurance.http";
// Types
import type { InsuranceGetSubmissionsResponseDto } from "@root/types/insurance.type";

export function useSubmissions() {
  const [submissions, setSubmissions] =
    useState<InsuranceGetSubmissionsResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  const getSubmissions = useCallback(async () => {
    setLoading(true);
    const data = await InsuranceService.getSubmissions();
    setLoading(false);
    setSubmissions(data);
  }, []);

  useEffect(() => {
    getSubmissions();
  }, [getSubmissions]);

  return {
    loading,
    data: submissions?.data,
    columns: submissions?.columns,
  };
}
