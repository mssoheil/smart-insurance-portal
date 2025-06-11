import { useCallback, useEffect, useRef, useState } from "react";
// Services
import InsuranceService from "@root/services/http/insurance.http";
// Hooks
import { useMessageApi } from "@root/contexts/messageProvider";
// Types
import type { InsuranceGetFormStructureResponseDto } from "@root/types/insurance.type";
import type { FormValues } from "@root/components/form-generator";
// Utils
import { getServerError } from "@root/utils/get-server-error";

export function useApply() {
  const [loading, setLoading] = useState(false);
  const [formStructure, setFormStructure] = useState<
    InsuranceGetFormStructureResponseDto[]
  >([]);
  const [messageApi] = useMessageApi();

  const calledAPiRef = useRef(false);

  const getFormStructure = useCallback(async () => {
    if (calledAPiRef.current) return;
    setLoading(true);
    calledAPiRef.current = true;

    try {
      const data = await InsuranceService.getFormStructure();
      setFormStructure(data);
    } catch (error: unknown) {
      messageApi.error(getServerError(error, "Form structure fetch failed"));
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    getFormStructure();
  }, [getFormStructure]);

  const handleSubmit = async (values: FormValues) => {
    const transformed = { ...values };

    Object.keys(transformed).forEach((key) => {
      const val = transformed[key];
      if (val && typeof val === "object" && val.isValid && val.format) {
        transformed[key] = val.format("YYYY-MM-DD");
      }
    });

    try {
      const result = await InsuranceService.submitFormData(transformed);
      messageApi.success(result.message);
    } catch (error: unknown) {
      messageApi.error(getServerError(error, "Form submission failed"));
    }
  };

  return {
    loading,
    calledAPiRef,
    formStructure,
    handlers: {
      handleSubmit,
    },
  };
}
