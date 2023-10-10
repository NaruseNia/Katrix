"use client"

import {useMemo, useState} from "react";
import {Column, Id} from "@/types";
import {Button} from "@/app/components/Button";
import PlusIcon from "@/app/components/icon/PlusIcon";
import styles from "./Board.module.scss";
import {ColumnContainer} from "@/app/components/ColumnContainer";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {DndContext} from "@dnd-kit/core";
import {useHotkeys} from "react-hotkeys-hook";

export const Board = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map(c => c.id), [columns]);

  useHotkeys("shift+alt+d", () => {
    createColumn();
  });
  useHotkeys("shift+alt+a", () => {
    createColumnLeft();
  });

  const generateIdForColumn = () => {
    return `COLUMN-${Math.random().toString(32).substring(2)}`;
  }

  const deleteColumn = (id: Id) => {
    const filtered = columns.filter(col => col.id !== id);
    console.log(filtered);
    setColumns(filtered);
  };

  const getRandomColor = (): string => {
    const get100 = () => { return Math.floor(Math.random()*100); };
    const get360 = () => { return Math.floor(Math.random()*360); };
    let [h, s, l] = [get360(), get100(), "80%"];
    return `hsl(${h}deg, ${s}%, ${l})`;
  }
  const createColumn = () => {
    const columnToAdd: Column = {
      id: generateIdForColumn(),
      title: `Column ${columns.length + 1}`,
      color: getRandomColor(),
      cards: []
    };

    setColumns([...columns, columnToAdd]);
  };
  const createColumnLeft = () => {
    const columnToAdd: Column = {
      id: generateIdForColumn(),
      title: `Column ${columns.length + 1}`,
      color: getRandomColor(),
      cards: []
    };

    setColumns([columnToAdd, ...columns]);
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={createColumnLeft} className={styles.add_column_button_left}>
        列を追加
      </Button>
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
        列を追加
      </Button>
    </div>
  )
}