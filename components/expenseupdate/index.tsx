"use client";

import React, { useContext } from "react";
import TopBar, { TopBarPropTypes } from "../../modules/topbar";
import { ExpensesContext } from "@/contexts/expenses";
import styles from "./expenseupdate.module.scss";
import { useRouter } from "next/navigation";
import Button, { ButtonPropTypes } from "../../modules/button";

export interface ExpenseUpdatePropTypes {
  topbar: TopBarPropTypes;
  updateButton: ButtonPropTypes;
  cancelButton: ButtonPropTypes;
}

const ExpenseUpdate = ({
  topbar,
  updateButton,
  cancelButton,
}: ExpenseUpdatePropTypes) => {
  const { expenses } = useContext(ExpensesContext);
  const router = useRouter();
  return (
    <div className={styles.pageWrapper}>
      <TopBar {...{ ...topbar, buttonHandler: () => {} }} />
      Form
      <div className={styles.btnWrapper}>
        <Button {...cancelButton} />
        <Button {...updateButton} />
      </div>
    </div>
  );
};

export default ExpenseUpdate;
