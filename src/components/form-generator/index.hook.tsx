import { useCallback, useEffect, useState } from "react";
// UI frameworks
import {
  Card,
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  DatePicker,
  InputNumber,
} from "antd";
// Utils
import { getServerError } from "@root/utils/get-server-error";
import { generateRules } from "@root/components/form-generator/index.util";
// Types
import type {
  FormStructureField,
  InsuranceGetFormStructureResponseDto,
} from "@root/types/insurance.type";
// Services
import DynamicOptionsService from "@root/services/http/dynamic.http";
// Hooks
import { useMessageApi } from "@root/contexts/messageProvider";

export function useFormGenerator(
  formData: InsuranceGetFormStructureResponseDto
) {
  const [fetchedConfigs, setFetchedConfigs] = useState<
    { endpoint: string; hash: string }[]
  >([]);
  const [form] = Form.useForm();
  const [fetchedOptions, setFetchedOptions] = useState<
    Record<string, unknown[]>
  >({});
  const [changedValues, setChangedValues] = useState<string>("");
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>(
    {}
  );

  const [messageApi] = useMessageApi();

  const fetchDynamicOptions = useCallback(
    async (field: FormStructureField) => {
      if (field.type !== "select" || !field.dynamicOptions) return;

      const { dependsOn, endpoint, method } = field.dynamicOptions;
      const depVal = form.getFieldValue(dependsOn);
      if (!depVal) return;

      // Only fetch if the dependent field's value has changed, not on every field change
      const hash = JSON.stringify({ [dependsOn]: depVal });

      const existing = fetchedConfigs.find(
        (config) => config.endpoint === endpoint
      );
      if (existing?.hash === hash) return;

      try {
        const { data } = await DynamicOptionsService.dynamicFetch(
          endpoint,
          method,
          { [dependsOn]: depVal }
        );

        setFetchedConfigs((prev) => [
          ...prev.filter((config) => config.endpoint !== endpoint),
          { endpoint, hash },
        ]);

        setFetchedOptions((prev) => ({
          ...prev,
          [field.id]: data[`${field.id}s`] || [],
        }));
      } catch (error: unknown) {
        messageApi.error(
          getServerError(error, `Error fetching options for ${field.id}`)
        );
      }
    },
    [form, fetchedConfigs, messageApi]
  );

  const handleValuesChange = (
    _: unknown,
    allValues: Record<string, unknown>
  ) => {
    setChangedValues(JSON.stringify(allValues));
    updateFieldVisibility(formData.fields || [], allValues);
  };

  useEffect(() => {
    formData.fields?.forEach((field) => {
      if (field.type === "group") {
        field.fields?.forEach(fetchDynamicOptions);
      } else {
        fetchDynamicOptions(field);
      }
    });
  }, [changedValues, fetchDynamicOptions, formData.fields]);

  const isFieldVisible = useCallback(
    (
      field: FormStructureField,
      allValues: Record<string, unknown>
    ): boolean => {
      const { visibility } = field;
      if (!visibility) {
        return true;
      }

      const { dependsOn, condition, value } = visibility;
      const dependsValue = allValues[dependsOn];

      switch (condition) {
        case "equals":
          return dependsValue === value;
        case "notEquals":
          return dependsValue !== value;
        default:
          return true;
      }
    },
    []
  );

  const updateFieldVisibility = useCallback(
    (fields: FormStructureField[], allValues: Record<string, unknown>) => {
      const newVisibility: Record<string, boolean> = {};

      const checkFields = (list: FormStructureField[]) => {
        list.forEach((field) => {
          if (field.type === "group") {
            checkFields(field.fields || []);
          } else {
            newVisibility[field.id] = isFieldVisible(field, allValues);
          }
        });
      };

      checkFields(fields);
      setVisibleFields(newVisibility);
    },
    [isFieldVisible]
  );

  useEffect(() => {
    const allInitialValues = form.getFieldsValue(true);
    updateFieldVisibility(formData.fields || [], allInitialValues);
  }, [form, formData.fields, updateFieldVisibility]);

  const renderField = (field: FormStructureField, prefix: string[] = []) => {
    const name = field.id;
    if (visibleFields[field.id] === false) return null;

    const rules = generateRules(field);

    const commonProps = {
      name,
      rules,
      label: field.label,
    };

    switch (field.type) {
      case "text":
        return (
          <Form.Item {...commonProps} key={field.id}>
            <Input />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item key={field.id} {...commonProps}>
            <InputNumber />
          </Form.Item>
        );
      case "date":
        return (
          <Form.Item key={field.id} {...commonProps}>
            <DatePicker className="w-full" />
          </Form.Item>
        );
      case "select": {
        const options =
          (field as FormStructureField).options ||
          fetchedOptions[field.id] ||
          [];
        return (
          <Form.Item key={field.id} {...commonProps}>
            <Select
              options={options.map((option) => ({
                label: option,
                value: option,
              }))}
            />
          </Form.Item>
        );
      }
      case "radio":
        return (
          <Form.Item key={field.id} {...commonProps}>
            <Radio.Group options={field.options} />
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item key={field.id} {...commonProps}>
            <Checkbox.Group options={field.options} />
          </Form.Item>
        );
      case "group":
        return (
          <Card key={field.id} title={field.label} className="mb-6">
            {field.fields?.map((fieldItem) =>
              renderField(fieldItem, [...prefix, field.id])
            )}
          </Card>
        );
      default:
        return null;
    }
  };

  return {
    form,
    handlers: {
      renderField,
      handleValuesChange,
    },
  };
}
