"use client";

import React, { useContext } from "react";
import TopBar, { TopBarPropTypes } from "../topbar";
import {
  Expense,
  ExpenseTypeEnum,
  ExpensesContext,
  getAmountString,
  getAmountStringByType,
  getMonthString,
  getMonthlyExpenses,
  getTotalExpense,
} from "@/contexts/expenses";
import styles from "./expensetracking.module.scss";
import classNames from "classnames";
import Tabs, { TabType } from "../tabs";
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
            onClick={() => router.push("/edit/" + id)}
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
      <TopBar {...{ ...topbar, buttonHandler: () => router.push("/add") }} />
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
