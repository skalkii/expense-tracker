"use client";

import React, { useContext } from "react";
import TopBar, { TopBarPropTypes } from "../../modules/topbar";
import { ExpensesContext } from "@/contexts/expenses";
import styles from "./expensecreate.module.scss";
import { useRouter } from "next/navigation";
import Button, { ButtonPropTypes } from "../../modules/button";

export interface ExpenseCreatePropTypes {
  topbar: TopBarPropTypes;
  addButton: ButtonPropTypes;
  cancelButton: ButtonPropTypes;
}

const ExpenseCreate = ({
  topbar,
  addButton,
  cancelButton,
}: ExpenseCreatePropTypes) => {
  const { expenses } = useContext(ExpensesContext);
  const router = useRouter();
  return (
    <div className={styles.pageWrapper}>
      <TopBar {...{ ...topbar, buttonHandler: () => router.push("/add") }} />
      Form
      <div className={styles.btnWrapper}>
        <Button {...cancelButton} />
        <Button {...addButton} />
      </div>
    </div>
  );
};

export default ExpenseCreate;
