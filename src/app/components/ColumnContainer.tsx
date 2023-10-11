"use client"

import {Card, Column, Id} from "@/types";
import {TrashIcon} from "@/app/components/icon/TrashIcon";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {DraggableIcon} from "@/app/components/icon/DraggableIcon";
import {TaskCard} from "@/app/components/TaskCard";
import {useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import PlusIcon from "@/app/components/icon/PlusIcon";

interface Props {
  column: Column;
  cards: Card[];
  deleteColumn: (id: Id) => void;
  createCard: (columnId: Id) => void;
  deleteCard: (id: Id) => void;
}

export const ColumnContainer = (props: Props) => {
  const { column, cards = [], deleteColumn, createCard, deleteCard } = props;
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const cardsId = useMemo(() => cards.map(c => c.id), [cards])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
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

  const confirmEdit = (e: KeyboardEvent) => {
    if (inputRef.current != null && inputRef.current?.value != "") {
      if (e.key == "Enter") {
        column.title = inputRef.current.value
        setEditTitle(false);
      }
    }
  }

  useEffect(() => {
    console.log(cards)
  }, [cards]);

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus();
      inputRef.current.value = column.title;
    }
  }, [editTitle]);

  if (isDragging) {
    return <Overlay ref={setNodeRef} style={style}>

    </Overlay>
  }
  return (
    <ColumnLayout ref={setNodeRef} style={style}>
      <Header style={{background: column.color}} {...attributes} {...listeners}>
        <div>
          <DraggableIcon />
        </div>
        {editTitle ?
          <div className="title">
            <input
              onBlur={() => setEditTitle(false)}
              onKeyDown={(e) => confirmEdit(e)}
              ref={inputRef}
            />
          </div>
          :
          <div className="title" onClick={() => setEditTitle(true)}>
            {column.title}
          </div>
        }
        <button className="trash">
          <div onClick={() => deleteColumn(column.id)} style={{cursor: "pointer", zIndex: 12}}>
            <TrashIcon/>
          </div>
        </button>
      </Header>
      <Content>
        <SortableContext items={cardsId}>
          {cards.map(card => (
            <TaskCard key={card.id} card={card} deleteCard={deleteCard} />
          ))}
        </SortableContext>
      </Content>
      <AddButton onClick={() => createCard(column.id)} >
        <PlusIcon />
        カードを追加
      </AddButton>
    </ColumnLayout>
  )
}

const Overlay = styled.div`
  width: 300px;
  border-radius: 6px;
  border: solid 4px var(--dark-gray);
  background: var(--black);
  opacity: 0.5;
`;
const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--black);
  width: 300px;
  border-radius: 6px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  height: 72px;
  width: 100%;
  border-radius: 6px 6px 0 0;
  padding: 6px;
  font-weight: bold;
  font-size: 18px;
  color: var(--black);
  div + div {
    margin-left: 6px;
  }
  .title {
    display: block;
    flex-grow: 1;
    margin-bottom: 6px;
    vertical-align: center;
  }
  .trash {
    position: relative;
    display: flex;
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
  margin-top: 1rem;
  &:hover {
    background: var(--dark-gray);
  }
`;