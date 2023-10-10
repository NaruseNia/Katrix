"use client"

import {Card, Column, Id} from "@/types";
import {TrashIcon} from "@/app/components/icon/TrashIcon";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {DraggableIcon} from "@/app/components/icon/DraggableIcon";
import {TaskCard} from "@/app/components/TaskCard";
import {useMemo, useState} from "react";
import styled from "styled-components";
import PlusIcon from "@/app/components/icon/PlusIcon";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn} = props;

  const [cards, setCards] = useState<Card[]>([]);
  const cardsId = useMemo(() => cards.map(c => c.id), [cards])

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  const createId = () => {
    return `CARD-${Math.random().toString(32).substring(2)}`;
  }

  const deleteCard = (id: Id) => {
    const filtered = cards.filter((c) => c.id != id);
    setCards(filtered);
  }

  return (
    <ColumnLayout ref={setNodeRef} style={style}>
      <Header style={{background: column.color}}>
        <div {...attributes} {...listeners}>
          <DraggableIcon />
        </div>
        <div>
          {column.title}
        </div>
        <button className="trash" style={{cursor: "pointer", zIndex: 12}} onClick={() => deleteColumn(column.id)}>
          <TrashIcon/>
        </button>
      </Header>
      <Content>
        <SortableContext items={cardsId}>
          {cards.map(card => (
            <TaskCard key={card.id} card={card} deleteCard={deleteCard} />
          ))}
        </SortableContext>
      </Content>
      <AddButton onClick={() => {
        setCards([...cards, {id: createId(), title: createId(), description: "", createdAt: new Date()}]);
      }}>
        <PlusIcon />
        Add Card
      </AddButton>
    </ColumnLayout>
  )
}

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--black);
  width: 350px;
  border-radius: 6px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  height: 45px;
  width: 100%;
  border-radius: 6px 6px 0 0;
  padding: 6px;
  font-weight: bold;
  color: var(--black);
  div + div {
    margin-left: 6px;
  }
  .trash {
    position: relative;
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  background: var(--black);
  margin-top: -6px;
  border-radius: 6px;
`;
const AddButton = styled.button`
  display: grid;
  place-items: center;
  padding: 12px;
  width: 100%;
  height: 72px;
  border-radius: 6px;
  transition: background-color 0.2s;
  background: var(--black);
  &:hover {
    background: var(--dark-gray);
  }
`;