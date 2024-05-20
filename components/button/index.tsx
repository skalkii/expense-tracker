"use client";

import React from "react";
import classNames from "classnames";

enum BUTTON_TYPE {
  solid,
  outline,
}

export interface ButtonPropTypes {
  title: string;
  type: keyof typeof BUTTON_TYPE;
  clickHandler?: Function;
  disabled?: boolean;
}

const Button = ({
  title,
  type,
  clickHandler = () => {},
  disabled = false,
}: ButtonPropTypes) => {
  return (
    <button
      className={classNames("button", type)}
      disabled={disabled}
      onClick={() => clickHandler()}
    >
      {title}
    </button>
  );
};

export default Button;
