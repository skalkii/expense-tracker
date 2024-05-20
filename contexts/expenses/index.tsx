"use client";

import {
  Categories,
  Category,
  Expense,
  ExpensesDummy,
} from "@/utils/useExpense";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { v4 } from "uuid";

export interface ExpensesContextType {
  expenses: Expense[];
  createExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (expenseId: string) => void;
  addNewCategory: (category: string) => void;
  updateCategory: (categoryId: string, newName: string) => void;
  deleteCategory: (categoryId: string) => void;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  categories: Category[];
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  createExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  setCategories: () => {},
  addNewCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
  categories: [],
});

const ExpensesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>(Categories);
  const allCategoryNames = categories.map(({ name }) => name.toLowerCase());

  const addNewCategory = (category: string) => {
    if (allCategoryNames.includes(category.toLowerCase()) || !category?.length)
      return;
    const newCategory: Category = {
      id: v4(),
      name: category.trim(),
      order: categories.length + 1,
      isMain: false,
    };
    setCategories(categories.concat(newCategory));
  };

  const updateCategory = (categoryId: string, newName: string) => {
    if (allCategoryNames.includes(newName.toLowerCase()) || !newName?.length)
      return;
    const category = categories.find(({ id }) => id === categoryId) as Category;
    if (category.isMain) return;
    category.name = newName;
    const updatedCategories = categories.map((cat) => {
      if (cat.id === categoryId) return category;
      return cat;
    });
    setCategories(updatedCategories);
    // update expenses
    const updatedExpenses = expenses.map((exp) => {
      if (exp.category.id === categoryId) {
        return {
          ...exp,
          category: { ...exp.category, name: newName },
        };
      }
      return exp;
    });
    setExpenses(updatedExpenses);
  };

  const deleteCategory = (categoryId: string) => {
    const category = categories.find(({ id }) => id === categoryId) as Category;
    if (category.isMain) return;
    const updatedCategories = categories
      .filter(({ id }) => id !== categoryId)
      .map((cat, idx) => ({ ...cat, order: idx + 1 }));
    setCategories(updatedCategories);
    // update expenses
    const updatedExpenses = expenses.filter(
      (exp) => exp.category.id !== categoryId
    );
    setExpenses(updatedExpenses);
  };

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
      value={{
        expenses,
        createExpense,
        deleteExpense,
        updateExpense,
        categories,
        setCategories,
        addNewCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
