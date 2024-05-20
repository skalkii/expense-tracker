"use client";

import React, { useContext } from "react";
import TopBar, { TopBarPropTypes } from "../topbar";
import { ExpensesContext } from "@/contexts/expenses";
import styles from "./expensecategories.module.scss";
import Tabs, { TabType } from "../tabs";

export interface ExpenseCategoriesPropTypes {
  topbar: TopBarPropTypes;
  tabs: TabType[];
}

const ExpenseTracking = ({ topbar, tabs }: ExpenseCategoriesPropTypes) => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <div className={styles.pageWrapper}>
      <TopBar {...topbar} />
      Categories
      <Tabs tabs={tabs} />
    </div>
  );
};

export default ExpenseTracking;
