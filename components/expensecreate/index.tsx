"use client";

import React from "react";
import TopBar, { TopBarPropTypes } from "../../modules/topbar";
import styles from "./expensecreate.module.scss";
import { useRouter } from "next/navigation";
import Button, { ButtonPropTypes } from "../../modules/button";
import { FormFieldType, useForm } from "@/utils/useForm";
import FormField from "../formfield";
import { Categories, ExpenseTypeEnum } from "@/utils/useExpense";

export interface ExpenseCreatePropTypes {
  topbar: TopBarPropTypes;
  addButton: ButtonPropTypes;
  cancelButton: ButtonPropTypes;
  formFields: FormFieldType[];
}

const ExpenseCreate = ({
  topbar,
  addButton,
  cancelButton,
  formFields,
}: ExpenseCreatePropTypes) => {
  const {
    fieldsWithStateKeysAndOptions,
    formData,
    formErrorData,
    changeHandler,
    submitting,
    handleSubmission,
  } = useForm(formFields);
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <TopBar {...topbar} />
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
          {...{ ...addButton, clickHandler: () => handleSubmission("create") }}
        />
      </div>
    </div>
  );
};

export default ExpenseCreate;
