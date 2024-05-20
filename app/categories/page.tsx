import { Roboto } from "next/font/google";
import ExpenseCategories, {
  ExpenseCategoriesPropTypes,
} from "@/components/expensecategories";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import EXPENSE_CATEGORIES_CONTENT from "@/content/expensecategories.json";

export default function Home() {
  return (
    <main className={roboto.className}>
      <ExpenseCategories
        {...(EXPENSE_CATEGORIES_CONTENT as ExpenseCategoriesPropTypes)}
      />
    </main>
  );
}
