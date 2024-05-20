import { v4 } from "uuid";

export enum ExpenseTypeEnum {
  CashIn = "Cash In",
  CashOut = "Cash Out",
}

export interface Category {
  name: string;
  isMain: boolean;
  order: number;
}

export interface Expense {
  type: ExpenseTypeEnum;
  category: Category;
  date: Date;
  amount: number;
  description?: string;
  id: string;
}

export const getTotalExpense = (expenses: Expense[]): number => {
  let total = 0;
  for (const { type, amount } of expenses) {
    if (type === ExpenseTypeEnum.CashIn) total += amount;
    else total -= amount;
  }
  return total;
};

export const getAmountString = (amount: number, currency = "¥"): string => {
  return `${amount < 0 ? "-" : "+"} ${currency}${amount}`;
};

export const getAmountStringByType = (
  type: ExpenseTypeEnum,
  amount: number,
  currency = "¥"
): string => {
  return `${type === ExpenseTypeEnum.CashOut ? "-" : "+"} ${currency}${amount}`;
};

export const getMonthString = (date: Date): string => {
  const [year, month, day] = date.toISOString().split("T")[0].split("-");
  return month + "/" + year;
};

export const getMonthlyExpenses = (expenses: Expense[]): Expense[][] => {
  const result = [];
  if (!expenses.length) return [];
  const sortedExpenses = [...expenses].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  let monthString = getMonthString(sortedExpenses[0].date);
  let monthlyExpenses = [];
  for (const expense of sortedExpenses) {
    const nextMonthStr = getMonthString(expense.date);
    if (nextMonthStr !== monthString) {
      result.push(monthlyExpenses);
      monthString = nextMonthStr;
      monthlyExpenses = [];
    }
    monthlyExpenses.push(expense);
  }
  if (monthlyExpenses.length) result.push(monthlyExpenses);

  return result;
};

export const Categories: Category[] = [
  { isMain: true, order: 1, name: "Food" },
  { isMain: true, order: 2, name: "Transportation" },
  { isMain: true, order: 3, name: "Work" },
  { isMain: false, order: 4, name: "Traveling" },
];

export const ExpensesDummy: Expense[] = [
  {
    type: ExpenseTypeEnum.CashIn,
    category: Categories[0],
    date: new Date("2023-09-10"),
    amount: 2000,
    description: "bought something",
    id: v4(),
  },
  {
    type: ExpenseTypeEnum.CashIn,
    category: Categories[1],
    date: new Date("2023-07-10"),
    amount: 2900,
    description: "bought something",
    id: v4(),
  },
  {
    type: ExpenseTypeEnum.CashIn,
    category: Categories[2],
    date: new Date("2023-07-10"),
    amount: 7000,
    description: "bought something",
    id: v4(),
  },
  {
    type: ExpenseTypeEnum.CashIn,
    category: Categories[3],
    date: new Date("2023-08-10"),
    amount: 2050,
    description: "bought something",
    id: v4(),
  },
  {
    type: ExpenseTypeEnum.CashIn,
    category: Categories[1],
    date: new Date("2023-08-10"),
    amount: 2300,
    description: "bought something",
    id: v4(),
  },
  {
    type: ExpenseTypeEnum.CashOut,
    category: Categories[2],
    date: new Date("2023-09-10"),
    amount: 3000,
    description: "bought something",
    id: v4(),
  },
];
