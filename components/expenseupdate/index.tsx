"use client";

import React, { useContext } from "react";
import TopBar, { TopBarPropTypes } from "../../modules/topbar";
import { ExpensesContext } from "@/contexts/expenses";
import styles from "./expenseupdate.module.scss";
import { notFound, useParams, useRouter } from "next/navigation";
import Button, { ButtonPropTypes } from "../../modules/button";
import { FormFieldType, useForm } from "@/utils/useForm";
import FormField from "../formfield";

export interface ExpenseUpdatePropTypes {
  topbar: TopBarPropTypes;
  updateButton: ButtonPropTypes;
  cancelButton: ButtonPropTypes;
  formFields: FormFieldType[];
}

const ExpenseUpdate = ({
  topbar,
  updateButton,
  cancelButton,
  formFields,
}: ExpenseUpdatePropTypes) => {
  const { expenses, deleteExpense } = useContext(ExpensesContext);
  const router = useRouter();
  const { expenseId } = useParams();
  const currentExpense = expenses.find(({ id }) => expenseId === id);
  if (!currentExpense) return notFound();
  const {
    fieldsWithStateKeysAndOptions,
    formData,
    formErrorData,
    changeHandler,
    submitting,
    handleSubmission,
  } = useForm(formFields, currentExpense);
  return (
    <div className={styles.pageWrapper}>
      <TopBar
        {...{
          ...topbar,
          buttonHandler: () => deleteExpense(expenseId as string),
        }}
      />
      <div className={styles.formFieldsWrapper}>
        {fieldsWithStateKeysAndOptions.map((fieldData, index) => {
          return (
            <FormField
              submitting={!!submitting}
              field={fieldData}
              formErrorData={formErrorData}
              formData={formData}
              changeHandler={changeHandler}
              key={`field-${fieldData.fieldId}`}
            />
          );
        })}
      </div>
      <div className={styles.btnWrapper}>
        <Button
          {...{ ...cancelButton, clickHandler: () => router.push("/") }}
        />
        <Button
          {...{
            ...updateButton,
            clickHandler: () => handleSubmission("update"),
          }}
        />
      </div>
    </div>
  );
};

export default ExpenseUpdate;
