import TopBar from "@/modules/topbar";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={roboto.className}>
      <TopBar title="Oopsie!!" />
      <h2 style={{ textAlign: "center" }}>
        <Link href={"/"}>Back to Home</Link>
      </h2>
    </main>
  );
}
