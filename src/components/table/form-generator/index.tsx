// UI frameworks
import { Button, Card, Form, Space } from "antd";
// Hooks
import { useFormGenerator } from "@root/components/table/form-generator/index.hook";
// Types
import type { InsuranceGetFormStructureResponseDto } from "@root/types/insurance.type";

type Value =
  | string
  | number
  | boolean
  | null
  | {
      isValid?: () => boolean;
      format?: (f: string) => string;
    };

export type FormValues = Record<string, Value>;

interface Props {
  formData: InsuranceGetFormStructureResponseDto;
  onSubmit: (values: FormValues) => void;
}

export const FormGenerator = ({ formData, onSubmit }: Props) => {
  const {
    form,
    handlers: { renderField, handleValuesChange },
  } = useFormGenerator(formData);
  return (
    <div className="mx-auto max-w-[80vw] my-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        className="space-y-4"
        onValuesChange={handleValuesChange}
      >
        <h3 className="text-xl font-bold mb-4">{formData.title}</h3>
        <Card>
          {formData.fields?.map((field) => renderField(field))}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};
