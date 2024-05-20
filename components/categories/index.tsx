"use client";

import React, { useContext } from "react";
import { ExpensesContext } from "@/contexts/expenses";
import styles from "./categories.module.scss";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export interface DragNDropCategoriesPropTypes {}

const DragNDropCategories = ({}: DragNDropCategoriesPropTypes) => {
  const { categories, setCategories } = useContext(ExpensesContext);
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
                  <Draggable
                    key={category.id}
                    draggableId={category.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        className={styles.categorySingle}
                        {...provided.draggableProps}
                      >
                        <div {...provided.dragHandleProps}>{category.name}</div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default DragNDropCategories;
