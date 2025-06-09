export interface InsuranceGetFormStructureResponseDto {
  title: string;
  formId: string;
  fields?: FormStructureField[];
}

export interface InsuranceFormStructureSubmitResponseDto {
  status: string;
  message: string;
}

export interface InsuranceGetSubmissionsResponseDto {
  data: Data[];
  columns: string[];
}

type FormStructureField = {
  id: string;
  type: string;
  label: string;
  options?: string[];
  required?: boolean;
  visibility?: Visibility;
  fields?: FormStructureField[];
  dynamicOptions?: DynamicOption;
};

type DynamicOption = {
  method: string;
  endpoint: string;
  dependsOn: string;
};

type Visibility = {
  value: string;
  dependsOn: string;
  condition: string;
};

export type Data = {
  id: string;
  [key: string]: string | number;
};
