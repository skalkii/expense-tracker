# Specifications

# Expense Tracking Web Application

Develop a web application that can manage your expense and view your spending, earning by months.

## Requirements

This is an assignment to showcase your abilities as a frontend developer.
Please follow all checkbox in 4 sections below as much as possible. (Tick/Un-tick which you can/can't do)

### 1. Tech stack.

Its best to used our recommended stack as its our product tech stack.

- [ ] Use React.js
- [ ] Use [Typescript](https://www.typescriptlang.org/) as much as possible.

### 2. Knowledge of frontend architecture

- [ ] Use CSS, SASS to develop a **mobile first** and responsive design for desktop if possible
- [ ] Use React functional Components to break down the design into re-usable UI pieces.
- [ ] Store the data on your browser (calling API, backend is not nessary)

### 3. Ability to work with requirements

- [ ] Follow all checkbox in “User story & Design” section.
- [ ] Follow the given design as close as possible

### 4. Communication skills and Explanation of your work

- [ ] Write a concise and informative description on how u approach this assignment, based on the [Descriptions page](https://www.notion.so/a00b52a166e34fecb3b3550a404b165e?pvs=21)

## User story & Design

Make sure u tick on all the check box so that you dont miss a user story.

### Expense Tracking Page

- [ ] As a user, I can view all my expense records which is **grouped by months** and **show monthly total expense**
  - refer to interface `Expense` in “Interfaces” section of this page.
- [ ] As a user, I can view the **total expense of each monthly** in top right of each month section.
- [ ] As a user, I can distingush `Cash in` records by blue color & `+` sign; `Cash out` records by green color & `` sign
- [ ] As a user, I can go to Add Expense Page by clicking on `add` button in top right.
- [ ] As a user, I can go to Edit Expense Page by clicking on 1 expense record.
- [ ] As a user, I can go to Category List Page by clicking on the `category` menu button in bottom right.

![01-expense-tracking.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1144a376-1b4c-479a-be07-4915ac395319/3510e8a9-7624-40e8-835e-d0caa3cfb430/01-expense-tracking.png)

### Add Expense Page

- [ ] As a user, when I add new expense I'm required to select expense type as `Cash in` or `Cash out` via toggle switch
  - refer to enum `ExpenseTypeEnum` in Interfaces section of this page
- [ ] As a user, when I add new expense I'm required to select expense's category from list of category data via select box
  - refer to interface `Category` in Interfaces section of this page
- [ ] As a user, when I add new expense I'm required to input amount in number via input box
  - refer to interface `Expense` in Interfaces section of this page
- [ ] As a user, when I add new expense I'm required to input date that my expense took place via date picker
- [ ] As a user, when I add new expense I'm optional to input description via text area
- [ ] As a user, I can save newly created expense and go to Expense Tracking Page via `Add` button in bottom right
- [ ] As a user, I can cancel newly created expense and go to Expense Tracking Page via `Cancel` button in bottom left

![02-add-expense.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1144a376-1b4c-479a-be07-4915ac395319/e780e89a-4a3b-4a0b-bfb6-e36ac2fd05a6/02-add-expense.png)

### Edit Expense Page

- [ ] As a user, when I edit expense I can select expense type as `Cash in` or `Cash out` via toggle switch
- [ ] As a user, when I edit expense I can select expense's category from list of category data via select box
- [ ] As a user, when I edit expense I can input amount in number via input box
- [ ] As a user, when I edit expense I can input date that my expense took place via date picker
- [ ] As a user, when I edit expense I can input description via text area
- [ ] As a user, I can save edited expense via `Update` button in bottom right
- [ ] As a user, I can cancel edited expense via `cancel` button in bottom left
- [ ] As a user, I can remove edited expense via `Remove` button in top right

![03-edit-expense.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1144a376-1b4c-479a-be07-4915ac395319/42ddf57b-c6da-4839-8ca7-18b60193e34d/03-edit-expense.png)

### Category List Page

- [ ] As a user, I can see all categories in list
- [ ] As a user, I can change order of **all categories in list** via dragging the a row up or down.
- [ ] As a user, I can't edit or remove **4 main categories** such as ['Food', 'Transportation', 'Entertainment', 'Work']
  - refer to array `Categories[]` and interface `Category` in Interfaces section of this page
- [ ] As a user, I can add new category via `add` button at end of list which add _inline text box_.
- [ ] As a user, I can edit added category (not main categories) by clicking on a row which becomes an _inline text box_.
- [ ] As a user, I can remove added category (not main categories) via `x` button on each record which show Category List - Remove Modal
- [ ] As a user, I can go to Expense Tracking Page by clicking on the `expense` menu button in bottom left.

![04-category-list.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1144a376-1b4c-479a-be07-4915ac395319/3e5c7dbd-9f05-4f21-b5c2-cd669557ee10/04-category-list.png)

### Category List - Remove Modal

- [ ] As a user, I can remove selected category by clicking on `Confirm` button in bottom right of modal
  - Expenses with selected category will also be removed.
- [ ] As a user, I can cancel removing selected category and go to Category List Page by clicking on `Confirm` button in bottom right of modal

![05-category-list-remove.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1144a376-1b4c-479a-be07-4915ac395319/6ea6613d-6358-4ec9-931f-e1901b6a54fc/05-category-list-remove.png)

## Interfaces

```tsx
enum ExpenseTypeEnum = {
CashIn = "Cash In",
CashOut = "Cash Out",
}

interface Category {
  name: string
  isMain: boolean
  order: number
}

interface Expense {
  type: ExpenseTypeEnum
  category: Category
  date: Date
  amount: number
  description: string
}

const Categories: Category[] = [
  { isMain: true, order: 1, name: "Food" },
  { isMain: true, order: 2, name: "Transportation" },
  { isMain: true, order: 3, name: "Work" },
  { isMain: false, order: 4, name: "Traveling" },
]

```
