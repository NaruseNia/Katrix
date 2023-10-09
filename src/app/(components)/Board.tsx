"use client"

import {useState} from "react";
import {ColumnType, Id} from "@/app/(components)/Column";
import {Button} from "@/app/(components)/Button";
import PlusIcon from "@/app/(components)/(icon)/PlusIcon";
import styles from "./Board.module.scss";
import {ColumnContainer} from "@/app/(components)/ColumnContainer";

export const Board = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  const generateIdForColumn = () => {
    return `CLM-${columns.length + 1}`;
  }

  const deleteColumn = (id: Id) => {
    const filtered = columns.filter(col => col.id !== id);
    console.log(filtered);
    setColumns(filtered);
  };

  const createColumn = () => {
    const columnToAdd: ColumnType = {
      id: generateIdForColumn(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.columns}>
        {columns.map(column => (
          <ColumnContainer key={column.id} column={column} deleteColumn={deleteColumn} />
        ))}
      </div>
      <Button onClick={createColumn} className={styles.add_column_button}>
        <PlusIcon />
        Add Column
      </Button>
    </div>
  )
}