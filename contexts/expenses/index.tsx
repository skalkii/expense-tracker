"use client";

import {
  Categories,
  Category,
  Expense,
  ExpensesDummy,
} from "@/utils/useExpense";
import { FC, ReactNode, createContext, useState } from "react";

export interface ExpensesContextType {
  expenses: Expense[];
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
});

const ExpensesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(ExpensesDummy);
  const [categories, setCategories] = useState<Category[]>(Categories);
  return (
    <ExpensesContext.Provider value={{ expenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
