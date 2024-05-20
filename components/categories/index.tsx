"use client";

import React, { useContext, useState } from "react";
import { ExpensesContext } from "@/contexts/expenses";
import styles from "./categories.module.scss";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Button from "@/modules/button";
import Image from "next/image";
import { Category } from "@/utils/useExpense";

export interface DragNDropCategoriesPropTypes {}

const SingleCategory = ({
  category,
  index,
  updateCategory,
  deleteCategory,
}: {
  category: Category;
  index: number;
  updateCategory: Function;
  deleteCategory: Function;
}) => {
  const [name, setName] = useState(category.name);
  return (
    <Draggable key={category.id} draggableId={category.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          className={styles.categorySingle}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps}>
            <input
              className="input transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={category.isMain}
              onBlur={() => updateCategory(category.id, name.trim())}
            />
            {category.isMain ? null : (
              <Image
                className={styles.crossIcon}
                src={"/assets/icons/crossRed.svg"}
                alt={"delete-icon"}
                width={16}
                height={16}
                onClick={() => deleteCategory(category.id)}
              />
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
};

const DragNDropCategories = ({}: DragNDropCategoriesPropTypes) => {
  const {
    categories,
    setCategories,
    addNewCategory,
    deleteCategory,
    updateCategory,
  } = useContext(ExpensesContext);
  const [newCategory, setNewCategory] = useState("");
  console.log(categories);

  const onDragEnd = async (result: any) => {
    if (!result?.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceCategory = categories[sourceIndex];
    const destinationCategory = categories[destinationIndex];
    // if (sourceCategory.isMain || destinationCategory.isMain) return;

    const newCategories = Array.from(categories);
    const [removed] = newCategories.splice(result.source.index, 1);
    newCategories.splice(result.destination.index, 0, removed);

    setCategories(
      newCategories.map((category, index) => ({
        ...category,
        order: index + 1,
      }))
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="category-list">
          {(droppableProvided) => (
            <ul
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className={styles.categoryList}
            >
              {categories.map((category, index) => {
                return (
                  <SingleCategory
                    updateCategory={updateCategory}
                    deleteCategory={deleteCategory}
                    category={category}
                    index={index}
                  />
                );
              })}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className={styles.addCategoryWrapper}>
        <input
          className="input transparent"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="add new category"
        />
        <Button
          title="Add"
          clickHandler={() => {
            addNewCategory(newCategory.trim());
            setNewCategory("");
          }}
          type="solid"
        />
      </div>
    </>
  );
};

export default DragNDropCategories;
