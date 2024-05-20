import React from "react";
import TopBar, { TopBarPropTypes } from "../topbar";

export interface ExpenseTrackingPropTypes {
  topbar: TopBarPropTypes;
}

const ExpenseTracking = ({ topbar }: ExpenseTrackingPropTypes) => {
  return (
    <div>
      <TopBar {...topbar} />
      ExpenseTracking
    </div>
  );
};

export default ExpenseTracking;
