import { Roboto } from "next/font/google";
import ExpenseCreate, {
  ExpenseCreatePropTypes,
} from "@/components/expensecreate";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import EXPENSE_CREATE_CONTENT from "@/content/expensecreate.json";

export default function Home() {
  return (
    <main className={roboto.className}>
      <ExpenseCreate {...(EXPENSE_CREATE_CONTENT as ExpenseCreatePropTypes)} />
    </main>
  );
}
