import { useState } from "react";
import { v4 } from "uuid";
import { ExpenseTypeEnum } from "./useExpense";

enum AllowedFormFieldsTypes {
  select,
  date,
  textarea,
  number,
  toggle,
}

export enum FORM_STATE_KEY_DICT {
  type,
  category,
  amount,
  date,
  description,
}

export type FieldOptionType = {
  key: string;
  value?: string;
};

export type FormFieldType = {
  fieldId: keyof typeof FORM_STATE_KEY_DICT;
  type: keyof typeof AllowedFormFieldsTypes;
  isFullWidth?: boolean;
  label?: string;
  mandatory?: boolean;
  placeHolder?: string;
  validationErrorMessage?: string;
  fieldOptions?: FieldOptionType[];
  icon?: string;
};

export const errorMessage = "Something went wrong!";
export const fieldErrorMessage = "This Field is required.";

export const getTrimmedText = (text: string) =>
  text.toLowerCase().replace(/ /g, "");

export const getFormFields = (fields: FormFieldType[]) => {
  const mandatoryFields: string[] = [];
  const fieldsWithStateKeys: FormFieldType[] = fields
    .filter(({ type }) => type in AllowedFormFieldsTypes)
    .map((field) => {
      field.mandatory && mandatoryFields.push(field.fieldId);
      return field;
    });
  return { fieldsWithStateKeys, mandatoryFields };
};

export const getInitialFormStates = (fields: FormFieldType[]) => {
  const INITIAL_FORM_STATE: any = {};
  const INITIAL_FORM_ERROR_STATE: any = {};

  fields?.forEach(({ fieldId }) => {
    INITIAL_FORM_STATE[fieldId] = fieldId === "type" ? "CashIn" : "";
    INITIAL_FORM_ERROR_STATE[fieldId] = "";
  });
  return {
    INITIAL_FORM_STATE,
    INITIAL_FORM_ERROR_STATE,
  };
};

export const trimPayload = (payload: any) => {
  const result: any = {};
  for (const [key, value] of Object.entries(payload)) {
    result[key] = typeof value === "string" ? value.trim() : value;
  }
  return result;
};

export const formHasError = (formErrorData: any) => {
  for (const errorData of Object.values(formErrorData)) {
    if (errorData) return true;
  }
  return false;
};

export const getFormErrors = (
  formData: any,
  mandatoryFields: string[],
  fieldsWithStateKeys: FormFieldType[],
  initialState: any
) => {
  const newFormErrorData: any = { ...initialState };

  const validateMandatoryFields = (stateKey: string) => {
    const fieldData = fieldsWithStateKeys.find(
      (field) => field.fieldId === stateKey
    );
    if (!formData?.[stateKey] && mandatoryFields.includes(stateKey))
      newFormErrorData[stateKey] =
        fieldData?.validationErrorMessage || fieldErrorMessage;
  };

  ["type", "category", "amount", "date", "description"].forEach((value) => {
    validateMandatoryFields(value);
  });

  return newFormErrorData;
};

interface UseFormReturnPropTypes {
  formData: any;
  changeHandler: (val: any, key: any) => void;
  submitting: boolean;
  formErrorData: any;
  handleSubmission: () => void;
  fieldsWithStateKeys: FormFieldType[];
}

export const useForm = (
  formFields: FormFieldType[]
): UseFormReturnPropTypes => {
  const { fieldsWithStateKeys, mandatoryFields } = getFormFields(formFields);
  const { INITIAL_FORM_STATE, INITIAL_FORM_ERROR_STATE } =
    getInitialFormStates(fieldsWithStateKeys);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrorData, setErrorFormData] = useState(INITIAL_FORM_ERROR_STATE);
  const [submitting, setSubmitting] = useState(false);

  const changeHandler = (val: any, key: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: val,
    }));
    JSON.stringify(INITIAL_FORM_ERROR_STATE) !==
      JSON.stringify(formErrorData) &&
      setErrorFormData({ ...INITIAL_FORM_ERROR_STATE });
  };

  const handleSubmission = async () => {
    // already has validation error
    if (formHasError(formErrorData)) return;
    // create and check new validation error
    const newFormErrorData = getFormErrors(
      formData,
      mandatoryFields,
      fieldsWithStateKeys,
      INITIAL_FORM_ERROR_STATE
    );
    if (formHasError(newFormErrorData))
      return setErrorFormData(newFormErrorData);

    setSubmitting(true);
    console.log({ formData });
  };

  return {
    formData,
    changeHandler,
    submitting,
    formErrorData,
    handleSubmission,
    fieldsWithStateKeys,
  };
};
