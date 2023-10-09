"use client"

import {ColumnType, Id} from "@/app/(components)/Column";
import styled from "styled-components";
import {TrashIcon} from "@/app/(components)/(icon)/TrashIcon";

interface Props {
  column: ColumnType;
  deleteColumn: (id: Id) => void;
}

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn} = props;
  return (
    <ColumnLayout>
      <Header>
        <div>
          0
          {column.title}
        </div>
        <button onClick={() => deleteColumn(column.id)}>
          <TrashIcon/>
        </button>
      </Header>
      <Content>Content</Content>
      <div>Add Card</div>
    </ColumnLayout>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  background: #f13484;
  width: 100%;
  border-radius: 6px 6px 0 0;
  padding: 6px;
  font-weight: bold;
  color: var(--black);
`;
const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--black);
  width: 350px;
  height: 500px;
  border-radius: 6px;
`;
const Content = styled.div`
  display: flex;
  flex-grow: 1;
  background: var(--black);
  margin-top: -6px;
  border-radius: 6px;
`;