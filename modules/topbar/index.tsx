import React from "react";
import styles from "./topbar.module.scss";
import Button, { ButtonPropTypes } from "../button";

export interface TopBarPropTypes {
  title: string;
  button?: ButtonPropTypes;
  buttonHandler?: Function;
}

const TopBar = ({ title, button, buttonHandler }: TopBarPropTypes) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.btnwrap}>
        {button ? (
          <Button {...{ ...button, clickHandler: buttonHandler }} />
        ) : null}
      </div>
    </div>
  );
};

export default TopBar;
