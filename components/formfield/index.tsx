import React from "react";
import styles from "./formfield.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { FormFieldType } from "@/utils/useForm";
import Input from "@/modules/input";
import Dropdown from "@/modules/dropdown";
import Image from "next/image";
import InputArea from "@/modules/inputArea";
import Toggle from "@/modules/toggle";

type FormFieldProps = {
  field: FormFieldType;
  formData: any;
  changeHandler: (val: any, key: string) => void;
  submitting: boolean;
  formErrorData: any;
};

export const fieldError = (error: string, className?: string) => {
  return error ? <span className={className}>{error}</span> : null;
};

const FormField: React.FC<FormFieldProps> = ({
  field,
  formData,
  changeHandler,
  submitting,
  formErrorData,
}) => {
  const {
    fieldId,
    label,
    mandatory,
    type,
    fieldOptions,
    isFullWidth,
    placeHolder,
    icon,
  } = field;

  let fieldComponent;
  switch (type) {
    case "number":
      fieldComponent = (
        <>
          <Input
            placeHolder={placeHolder}
            value={formData[fieldId]}
            disabled={submitting}
            onChange={(e) => changeHandler(e.target.value, fieldId)}
            type={type}
          />
          <Image
            className={styles.dropDownArrow}
            src={icon as string}
            alt={"down-arrow"}
            width={16}
            height={16}
          />
        </>
      );
      break;
    case "date":
      fieldComponent = (
        <div>
          <DatePicker
            selected={formData[fieldId]}
            onChange={(value: any) => {
              changeHandler(value, fieldId);
            }}
            dateFormat={"dd/MM/yyyy"}
            disabled={submitting}
            className={styles.datePicker}
            wrapperClassName={styles.datePickerWrap}
            placeholderText={placeHolder}
          />
        </div>
      );
      break;
    case "select":
      fieldComponent = (
        <>
          <Dropdown
            placeHolder={placeHolder}
            value={formData[fieldId]}
            disabled={submitting}
            onChange={(e) => changeHandler(e.target.value, fieldId)}
            options={fieldOptions}
          />
          <Image
            className={styles.dropDownArrow}
            src={icon as string}
            alt={"down-arrow"}
            width={16}
            height={16}
          />
        </>
      );
      break;

    case "textarea":
      fieldComponent = (
        <InputArea
          placeHolder={placeHolder}
          value={formData[fieldId]}
          disabled={submitting}
          onChange={(e) => changeHandler(e.target.value, fieldId)}
          rows={4}
        />
      );
      break;

    case "toggle":
      fieldComponent = (
        <Toggle
          value={formData[fieldId]}
          disabled={submitting}
          onChange={(e) => changeHandler(e.target.value, fieldId)}
          stateKey={fieldId}
          options={fieldOptions}
        />
      );
      break;

    default:
      fieldComponent = null;
  }

  return (
    <div
      className={classNames(
        styles.singleFieldWrapper,
        isFullWidth ? styles.fullWidthField : undefined
      )}
    >
      <label>{`${label}${mandatory ? "*" : ""}`}</label>
      {fieldComponent}
      {fieldError(formErrorData[fieldId], styles.fieldError)}
    </div>
  );
};

export default FormField;
