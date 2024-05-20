import React from "react";
import styles from "./topbar.module.scss";
import Button, { ButtonPropTypes } from "../button";

export interface TopBarPropTypes {
  title: string;
  button?: ButtonPropTypes;
}

const TopBar = ({ title, button }: TopBarPropTypes) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.btnwrap}>
        {button ? <Button {...button} /> : null}
      </div>
    </div>
  );
};

export default TopBar;
