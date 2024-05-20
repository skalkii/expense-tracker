"use client";

import React from "react";
import TopBar, { TopBarPropTypes } from "../../modules/topbar";
import styles from "./expensecategories.module.scss";
import Tabs, { TabType } from "../../modules/tabs";
import DragNDropCategories from "../categories";

export interface ExpenseCategoriesPropTypes {
  topbar: TopBarPropTypes;
  tabs: TabType[];
}

const ExpenseCategories = ({ topbar, tabs }: ExpenseCategoriesPropTypes) => {
  return (
    <div className={styles.pageWrapper}>
      <TopBar {...topbar} />
      <DragNDropCategories />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default ExpenseCategories;
