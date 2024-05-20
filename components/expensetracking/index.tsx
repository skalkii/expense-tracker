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

export interface ExpenseTrackingPropTypes {
  topbar: TopBarPropTypes;
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
      {expenses.map(({ amount, category, type }, index) => {
        return (
          <div
            key={`exp${index}`}
            className={classNames(
              styles.cardItem,
              type === ExpenseTypeEnum.CashOut ? styles.cashOut : styles.cashIn
            )}
          >
            <p>{category.name}</p>
            <p>{getAmountStringByType(type, amount)}</p>
          </div>
        );
      })}
    </div>
  );
};

const ExpenseTracking = ({ topbar }: ExpenseTrackingPropTypes) => {
  const { expenses } = useContext(ExpensesContext);
  const monthlyExpenses = getMonthlyExpenses(expenses);
  console;
  return (
    <div>
      <TopBar {...topbar} />
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
    </div>
  );
};

export default ExpenseTracking;
