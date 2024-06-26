"use client";

import React, { useContext } from "react";
import TopBar, { TopBarPropTypes } from "../../modules/topbar";
import { ExpensesContext } from "@/contexts/expenses";
import {
  Expense,
  ExpenseTypeEnum,
  getAmountString,
  getAmountStringByType,
  getMonthString,
  getMonthlyExpenses,
  getTotalExpense,
} from "@/utils/useExpense";
import styles from "./expensetracking.module.scss";
import classNames from "classnames";
import Tabs, { TabType } from "../../modules/tabs";
import { useRouter } from "next/navigation";

export interface ExpenseTrackingPropTypes {
  topbar: TopBarPropTypes;
  tabs: TabType[];
}

interface ExpenseMonthlyCardPropTypes {
  month: string;
  expenses: Expense[];
}

const ExpenseMonthlyCard = ({
  month,
  expenses,
}: ExpenseMonthlyCardPropTypes) => {
  const totalExpense = getTotalExpense(expenses);
  const router = useRouter();
  return (
    <div className={styles.monthlyCard}>
      <div
        className={classNames(
          styles.cardHeader,
          totalExpense < 0 ? styles.cashOut : styles.cashIn
        )}
      >
        <p>{month}</p>
        <p>{getAmountString(totalExpense)}</p>
      </div>
      {expenses.map(({ id, amount, category, type }, index) => {
        return (
          <div
            key={`exp${index}`}
            className={classNames(
              styles.cardItem,
              type === ExpenseTypeEnum.CashOut ? styles.cashOut : styles.cashIn
            )}
            onClick={() => router.push("/update/" + id)}
          >
            <p>{category.name}</p>
            <p>{getAmountStringByType(type, amount)}</p>
          </div>
        );
      })}
    </div>
  );
};

const ExpenseTracking = ({ topbar, tabs }: ExpenseTrackingPropTypes) => {
  const { expenses } = useContext(ExpensesContext);
  const monthlyExpenses = getMonthlyExpenses(expenses);
  const router = useRouter();
  return (
    <div className={styles.pageWrapper}>
      <TopBar {...{ ...topbar, buttonHandler: () => router.push("/create") }} />
      <div className={styles.monthlyContainer}>
        {monthlyExpenses.map((monthExpense, index) => {
          return (
            <ExpenseMonthlyCard
              month={getMonthString(monthExpense[0].date)}
              expenses={monthExpense}
              key={`monthly${index}`}
            />
          );
        })}
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default ExpenseTracking;
