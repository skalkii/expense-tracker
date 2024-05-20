import React from "react";
import classNames from "classnames";

interface InputAreaPropType {
  placeHolder?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  value?: string;
  typeClass?: string;
  rows?: number;
}

const InputArea = ({
  placeHolder,
  onChange,
  disabled = false,
  value = "",
  typeClass = "transparent",
  rows,
}: InputAreaPropType) => {
  return (
    <textarea
      className={classNames("inputArea", typeClass)}
      onChange={onChange}
      placeholder={placeHolder}
      disabled={disabled}
      value={value}
      rows={rows}
    />
  );
};

export default InputArea;
