import { useContext, useState } from "react";
import { v4 } from "uuid";
import { Categories, Category, Expense, ExpenseTypeEnum } from "./useExpense";
import { ExpensesContext } from "@/contexts/expenses";
import { useRouter } from "next/navigation";

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

const getExpenseFromFormData = (formData: any): Expense => {
  const { amount, category, date, type, description } = formData;
  const newExpense: Expense = {
    id: v4(),
    category: Categories.find(({ name }) => name === category) as Category,
    date,
    type: ExpenseTypeEnum[type as keyof typeof ExpenseTypeEnum],
    description,
    amount: parseInt(amount, 10),
  };
  return newExpense;
};

const getFormDataFromExpense = (expense: Expense) => {
  const { id, amount, category, date, type, description } = expense;
  const newFormData = {
    id,
    category: category.name,
    date,
    type: type === ExpenseTypeEnum.CashIn ? "CashIn" : "CashOut",
    description,
    amount: amount.toString(),
  };
  return newFormData;
};

interface UseFormReturnPropTypes {
  formData: any;
  changeHandler: (val: any, key: any) => void;
  submitting: boolean;
  formErrorData: any;
  handleSubmission: (action: string) => void;
  fieldsWithStateKeys: FormFieldType[];
  fieldsWithStateKeysAndOptions: FormFieldType[];
}

export const useForm = (
  formFields: FormFieldType[],
  currentExpense?: Expense
): UseFormReturnPropTypes => {
  const { createExpense, updateExpense } = useContext(ExpensesContext);
  const { fieldsWithStateKeys, mandatoryFields } = getFormFields(formFields);
  const { INITIAL_FORM_STATE, INITIAL_FORM_ERROR_STATE } =
    getInitialFormStates(fieldsWithStateKeys);

  const [formData, setFormData] = useState(
    currentExpense ? getFormDataFromExpense(currentExpense) : INITIAL_FORM_STATE
  );
  const [formErrorData, setErrorFormData] = useState(INITIAL_FORM_ERROR_STATE);
  const [submitting, setSubmitting] = useState(false);

  const fieldsWithStateKeysAndOptions = fieldsWithStateKeys?.map((field) => {
    const { fieldId } = field;
    if (fieldId === "type") {
      field.fieldOptions = Object.keys(ExpenseTypeEnum).map((key) => ({
        key,
        value: ExpenseTypeEnum[key as keyof typeof ExpenseTypeEnum],
      }));
    }
    if (fieldId === "category") {
      field.fieldOptions = Categories.map(({ name }) => ({
        key: name,
        value: name,
      }));
    }
    return field;
  });
  const router = useRouter();

  const changeHandler = (val: any, key: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: val,
    }));
    JSON.stringify(INITIAL_FORM_ERROR_STATE) !==
      JSON.stringify(formErrorData) &&
      setErrorFormData({ ...INITIAL_FORM_ERROR_STATE });
  };

  const handleSubmission = async (action: string) => {
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
    setTimeout(() => {
      if (action === "create") {
        createExpense(getExpenseFromFormData(formData));
      }
      if (action === "update") {
        updateExpense({
          ...getExpenseFromFormData(formData),
          id: currentExpense?.id as string,
        });
      }
      setSubmitting(false);
      router.push("/");
    }, 100);
  };

  return {
    formData,
    changeHandler,
    submitting,
    formErrorData,
    handleSubmission,
    fieldsWithStateKeys,
    fieldsWithStateKeysAndOptions,
  };
};
