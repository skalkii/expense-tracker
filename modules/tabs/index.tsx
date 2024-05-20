import React from "react";
import styles from "./tabs.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type TabType = {
  title: string;
  href: string;
};

export interface TabsPropTypes {
  tabs: TabType[];
}

const Tabs = ({ tabs }: TabsPropTypes) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(router, pathname);
  return (
    <div className={styles.container}>
      {tabs.map(({ href, title }, index) => {
        console.log(pathname === href);
        return (
          <Link
            className={pathname === href ? styles.active : undefined}
            href={href}
            key={`${title}-${index}`}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
