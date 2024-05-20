import { Roboto } from "next/font/google";
import ExpenseUpdate, {
  ExpenseUpdatePropTypes,
} from "@/components/expenseupdate";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import EXPENSE_UPDATE_CONTENT from "@/content/expenseupdate.json";

export default function Home() {
  return (
    <main className={roboto.className}>
      <ExpenseUpdate {...(EXPENSE_UPDATE_CONTENT as ExpenseUpdatePropTypes)} />
    </main>
  );
}
