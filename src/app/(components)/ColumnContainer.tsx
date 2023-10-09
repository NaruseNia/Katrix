"use client"

import {Column, Id} from "@/app/(components)/Column";
import styled from "styled-components";
import {TrashIcon} from "@/app/(components)/(icon)/TrashIcon";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {inspect} from "util";
import styles = module
import {DraggableIcon} from "@/app/(components)/(icon)/DraggableIcon";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn} = props;

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

  return (
    <ColumnLayout ref={setNodeRef} style={style}>
      <Header style={{background: column.color}}>
        <div {...attributes} {...listeners}>
          <DraggableIcon />
        </div>
        <div>
          {column.title}
        </div>
        <button style={{cursor: "pointer", zIndex: 12}} onClick={() => deleteColumn(column.id)}>
          <TrashIcon/>
        </button>
      </Header>
      <Content>Content</Content>
      <div>Add Card</div>
    </ColumnLayout>
  )
}

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--black);
  width: 350px;
  height: 70vh;
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
`;
const Content = styled.div`
  display: flex;
  flex-grow: 1;
  background: var(--black);
  margin-top: -6px;
  border-radius: 6px;
`;