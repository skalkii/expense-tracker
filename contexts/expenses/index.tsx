"use client";

import {
  Categories,
  Category,
  Expense,
  ExpensesDummy,
} from "@/utils/useExpense";
import { useRouter } from "next/navigation";
import { FC, ReactNode, createContext, useState } from "react";

export interface ExpensesContextType {
  expenses: Expense[];
  createExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (expenseId: string) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  createExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
});

const ExpensesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>(Categories);

  const createExpense = (expense: Expense) => {
    setExpenses(expenses.concat(expense));
  };

  const updateExpense = (expense: Expense) => {
    const updatedExpenses = expenses.map((exp) => {
      if (exp.id === expense.id) {
        return expense;
      }
      return exp;
    });
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (expenseId: string) => {
    setExpenses(
      expenses.filter((exp) => {
        if (exp.id === expenseId) {
          return false;
        }
        return true;
      })
    );
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, createExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
