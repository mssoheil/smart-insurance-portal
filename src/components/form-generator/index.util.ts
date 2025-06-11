// Types
import type { Rule } from "antd/es/form";
import type { FormStructureField } from "@root/types/insurance.type";

export const generateRules = (
  field: FormStructureField
): Rule[] | undefined => {
  const rules: Rule[] = [];

  if (field.required) {
    rules.push({ required: true, message: `${field.label} is required` });
  }

  if (field.validation) {
    const { min, max } = field.validation;
    const isNumber = field.type === "number";
    const fieldType = isNumber ? "number" : "string";
    const commonMessage = isNumber ? "" : fieldType === "string";

    if (min !== undefined) {
      rules.push({
        min,
        type: fieldType,
        message: `${commonMessage}${field.label} must be at least ${min}`,
      });
    }

    if (max !== undefined) {
      rules.push({
        max,
        type: fieldType,
        message: `${commonMessage}${field.label} must be at most ${max}`,
      });
    }
  }
  return rules;
};
