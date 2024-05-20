import { Roboto } from "next/font/google";
import ExpenseTracking, {
  ExpenseTrackingPropTypes,
} from "@/components/expensetracking";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import EXPENSE_TRACKING_CONTENT from "@/content/expensetracking.json";

export default function Home() {
  return (
    <main className={roboto.className}>
      <ExpenseTracking
        {...(EXPENSE_TRACKING_CONTENT as ExpenseTrackingPropTypes)}
      />
    </main>
  );
}
