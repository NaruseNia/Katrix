"use client"

import {useMemo, useState} from "react";
import {Card, Column, Id} from "@/types";
import {Button} from "@/app/components/Button";
import PlusIcon from "@/app/components/icon/PlusIcon";
import styles from "./Board.module.scss";
import {ColumnContainer} from "@/app/components/ColumnContainer";
import {arrayMove, SortableContext, useSortable} from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent, DragOverEvent,
  DragOverlay, DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {useHotkeys} from "react-hotkeys-hook";
import {createPortal} from "react-dom";
import {TaskCard} from "@/app/components/TaskCard";

export const Board = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map(c => c.id), [columns]);

  const [cards, setCards] = useState<Card[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [activeCard, setActiveCard] = useState<Card | null>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 150,
      },
    })
  )

  useHotkeys("ctrl+alt+d", () => {
    createColumn();
  });
  useHotkeys("ctrl+alt+a", () => {
    createColumnLeft();
  });

  const generateId = (prefix: string) => {
    return `${prefix}-${Math.random().toString(32).substring(2)}`;
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
      id: generateId("COLUMN"),
      title: `Column ${columns.length + 1}`,
      color: getRandomColor(),
      cards: []
    };

    setColumns([...columns, columnToAdd]);
  };
  const createColumnLeft = () => {
    const columnToAdd: Column = {
      id: generateId("COLUMN"),
      title: `Column ${columns.length + 1}`,
      color: getRandomColor(),
    };

    setColumns([columnToAdd, ...columns]);
  };

  const createCard = (columnId: Id) => {
    setCards([...cards, {
      id: generateId("CARD"),
      title: "新しいカード",
      parent: columnId,
      description: "",
      createdAt: new Date(),
    }]);
    console.log("Created!", cards);
  }
  const deleteCard = (id: Id) => {
    const filtered = cards.filter(c => c.id != id);
    setCards(filtered);
  }

  const onDragStart = (event: DragStartEvent) => {
    console.log("Drag ", event);
    if (event.active.data.current?.type == "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }

    if (event.active.data.current?.type == "Card") {
      setActiveCard(event.active.data.current?.card);
      return;
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveCard(null);
    const {active, over} = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId == overId) return;

    setColumns(columns => {
      const activeColumnIdx = columns.findIndex(col => col.id == activeId);
      const overColumnIdx = columns.findIndex(col => col.id == overId);

      return arrayMove(columns, activeColumnIdx, overColumnIdx);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const {active, over} = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId == overId) return;

    const isActiveTask = active.data.current?.type == "Card";
    const isOverTask = over.data.current?.type == "Card";

    if (!isActiveTask) return;
    if (isActiveTask && isOverTask) {
      setCards(cards => {
        const activeIdx = cards.findIndex(c => c.id == active.id);
        const overIdx = cards.findIndex(c => c.id == over.id)

        cards[activeIdx].parent = cards[overIdx].parent;

        return arrayMove(cards, activeIdx, overIdx);
      })
    }

    const isOverColumn = over.data.current?.type == "Column";
    if (isActiveTask && isOverColumn) {
      setCards(cards => {
        const activeIdx = cards.findIndex(c => c.id == active.id);
        const overIdx = cards.findIndex(c => c.id == over.id)

        cards[activeIdx].parent = overId;

        return arrayMove(cards, activeIdx, overIdx);
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <Button onClick={createColumnLeft} className={styles.add_column_button_left}>
        列を追加
      </Button>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className={styles.columns}>
          <SortableContext items={columnsId}>
            {columns.map(column => (
              <ColumnContainer
                key={column.id}
                column={column}
                deleteColumn={deleteColumn}
                createCard={createCard}
                deleteCard={deleteCard}
                cards={cards.filter(c => c.parent == column.id)}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} />}
            {activeCard && <TaskCard card={activeCard} deleteCard={deleteCard} />}
          </DragOverlay>
          , document.body)}
      </DndContext>
      <Button onClick={createColumn} className={styles.add_column_button}>
        列を追加
      </Button>
    </div>
  )
}