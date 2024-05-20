import type { Metadata } from "next";
import "../styles/global.css";
import "../styles/_main.scss";

export const metadata: Metadata = {
  title: "Expense Tracking Web Application",
  description: "Manage your expense and view your spending, earning by months",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={""}>{children}</body>
    </html>
  );
}
