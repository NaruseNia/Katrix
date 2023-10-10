"use client"

import {useMemo, useState} from "react";
import {Column, Id} from "@/types";
import {Button} from "@/app/components/Button";
import PlusIcon from "@/app/components/icon/PlusIcon";
import styles from "./Board.module.scss";
import {ColumnContainer} from "@/app/components/ColumnContainer";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {DndContext} from "@dnd-kit/core";

export const Board = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map(c => c.id), [columns]);

  const generateIdForColumn = () => {
    return `CLM-${columns.length + 1}`;
  }

  const deleteColumn = (id: Id) => {
    const filtered = columns.filter(col => col.id !== id);
    console.log(filtered);
    setColumns(filtered);
  };

  const getRandomColor = (): string => {
    const get256 = () => { return Math.floor(Math.random()*256); };
    let [r, g, b] = [get256(), get256(), get256()];
    return `rgb(${r}, ${g}, ${b})`;
  }
  const createColumn = () => {
    const columnToAdd: Column = {
      id: generateIdForColumn(),
      title: `Column ${columns.length + 1}`,
      color: getRandomColor(),
    };

    setColumns([...columns, columnToAdd]);
  };

  return (
    <div className={styles.wrapper}>
      <DndContext>
        <div className={styles.columns}>
          <SortableContext items={columnsId}>
            {columns.map(column => (
              <ColumnContainer key={column.id} column={column} deleteColumn={deleteColumn} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
      <Button onClick={createColumn} className={styles.add_column_button}>
        <PlusIcon />
        Add Column
      </Button>
    </div>
  )
}