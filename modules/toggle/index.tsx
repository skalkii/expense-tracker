import { FieldOptionType } from "@/utils/useForm";
import classNames from "classnames";
import React from "react";

interface TogglePropType {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  value?: string;
  stateKey: string;
  options?: FieldOptionType[];
}

const Toggle = ({
  onChange,
  disabled = false,
  value = "",
  stateKey,
  options,
}: TogglePropType) => {
  return (
    <div className="toggleWrap">
      {options?.map((option) => {
        return (
          <div
            key={option.key}
            className={classNames(
              "toggle",
              option.key === value ? "checked" : ""
            )}
          >
            <input
              onChange={onChange}
              disabled={disabled}
              type="radio"
              id={option.key}
              name={stateKey}
              value={option.key}
            />
            <label htmlFor={option.key}>{option.value}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Toggle;
