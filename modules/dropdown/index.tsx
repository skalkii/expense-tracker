import React from "react";
import classNames from "classnames";
import { FieldOptionType } from "@/utils/useForm";

interface DropdownPropType {
  placeHolder?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  value?: string;
  typeClass?: string;
  options?: FieldOptionType[];
}

const Dropdown = ({
  placeHolder,
  onChange,
  disabled = false,
  value = "",
  typeClass = "transparent",
  options = [],
}: DropdownPropType) => {
  return (
    <select
      className={classNames("dropdown", typeClass)}
      onChange={onChange}
      disabled={disabled}
      value={value}
    >
      <option value={""}>{placeHolder}</option>
      {options.map(({ key, value }, index) => {
        return (
          <option key={`dropdown-${index}-${key}`} value={key}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
