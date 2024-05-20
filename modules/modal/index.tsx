"use client";

import React, { useContext } from "react";
import styles from "./modal.module.scss";
import Button from "../button";
import { ExpensesContext } from "@/contexts/expenses";

export interface ConfirmPopupPropsType {
  setShowModal: Function;
  categoryId: string;
}

const ConfirmPopup = ({ setShowModal, categoryId }: ConfirmPopupPropsType) => {
  const { deleteCategory } = useContext(ExpensesContext);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.card}>
        <li>Traveling will be removed.</li>
        <li>All expenses with this category will also be removed</li>
        <p>Do you really want to remove?</p>
        <div className={styles.btnWrapper}>
          <Button
            title="Cancel"
            clickHandler={() => {
              setShowModal("");
            }}
            type="solid"
          />
          <Button
            title="Confirm"
            clickHandler={() => {
              deleteCategory(categoryId);
              setShowModal("");
            }}
            type="solid"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
