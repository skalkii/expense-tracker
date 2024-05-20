import React from "react";
import classNames from "classnames";

interface InputPropType {
  placeHolder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  value?: string;
  typeClass?: string;
  type?: "text" | "email" | "number";
}

const Input = ({
  placeHolder,
  onChange,
  disabled = false,
  value = "",
  typeClass = "transparent",
  type = "text",
}: InputPropType) => {
  return (
    <input
      className={classNames("input", typeClass)}
      type={type}
      onChange={onChange}
      placeholder={placeHolder}
      disabled={disabled}
      value={value}
    />
  );
};

export default Input;
