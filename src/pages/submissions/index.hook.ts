import { useCallback, useEffect, useRef, useState } from "react";
// Services
import InsuranceService from "@root/services/http/insurance.http";
// Types
import type { InsuranceGetSubmissionsResponseDto } from "@root/types/insurance.type";
// Hooks
import { useMessageApi } from "@root/hooks/message-api.hook";
// Utils
import { getServerError } from "@root/utils/get-server-error";

export function useSubmissions() {
	const [submissions, setSubmissions] =
		useState<InsuranceGetSubmissionsResponseDto | null>(null);
	const [loading, setLoading] = useState(false);
	const [messageApi] = useMessageApi();

	const calledAPiRef = useRef(false);

	const getSubmissions = useCallback(async () => {
		if (calledAPiRef.current) return;
		setLoading(true);
		calledAPiRef.current = true;

		try {
			const data = await InsuranceService.getSubmissions();
			setSubmissions(data);
		} catch (error: unknown) {
			messageApi.error(getServerError(error, "Submission failed"));
		} finally {
			setLoading(false);
		}
	}, [messageApi]);

	useEffect(() => {
		getSubmissions();
	}, [getSubmissions]);

	return {
		loading,
		calledAPiRef,
		data: submissions?.data,
		columns: submissions?.columns,
	};
}
