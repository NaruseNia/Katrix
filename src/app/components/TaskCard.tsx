import {Card, Id} from "@/types";
import styled from "styled-components";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {DraggableIcon} from "@/app/components/icon/DraggableIcon";
import {TrashIcon} from "@/app/components/icon/TrashIcon";

export const TaskCard = ({card, deleteCard}: {card: Card, deleteCard: (id: Id) => void}) => {
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [descEdit, setDescEdit] = useState<boolean>(false);
  const inputRef: MutableRefObject<HTMLInputElement> = useRef(null);
  const descInputRef: MutableRefObject<HTMLTextAreaElement> = useRef(null);

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: card.id,
    data: {
      type: "Card",
      card,
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const enterTitle = (e: KeyboardEvent) => {
    if (inputRef != null && inputRef.current.value != "") {
      if (e.key == "Enter") {
        card.title = inputRef ? inputRef.current.value : card.title;
        setTitleEdit(false);
      }
      if (e.key == "Escape") cancelEditTitle();
    }

  }
  const enterDesc = (e: KeyboardEvent) => {
    if (e.key == "Enter" && descInputRef != null && descInputRef.current.value != "") {
      card.description = descInputRef.current.value;
      setDescEdit(false);
    }
  }

  const cancelEditTitle = () => {
    if (inputRef.current.value != "") setTitleEdit(false);
  }

  const enterEditTitle = () => {
    setTitleEdit(true);
  }

  const enterEditDesc = () => {
    setDescEdit(true);
  }

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus();
      inputRef.current.value = card.title;
    }
  }, [titleEdit]);
  useEffect(() => {
    if (descInputRef.current != null) {
      descInputRef.current.focus();
      descInputRef.current.value = card.description;
    }
  }, [descEdit]);

  return (
    <CardWrapper color={card.parent.color} ref={setNodeRef} style={style}>
      <div className="draggable" {...attributes} {...listeners}>
        <DraggableIcon width={12}/>
      </div>
      <div className="content">
        {titleEdit ?
          <input className="title_input"
                 onKeyDown={(e) => enterTitle(e)}
                 onBlur={cancelEditTitle}
                 type="text"
                 ref={inputRef}
          />
          :
          <div className="header">
            <div className="title" onClick={() => enterEditTitle()}>
              {card.title}
            </div>
            <button className="delete" onClick={() => deleteCard(card.id)}>
              <TrashIcon color="var(--white)" width={16}/>
            </button>
          </div>
        }
        <div className="created">{card.createdAt.toDateString()}</div>
        {descEdit ?
          <textarea className="desc_input"
                    onKeyDown={(e) => enterDesc(e)}
                    ref={descInputRef}
          />
          :
          <div className="desc" onClick={enterEditDesc}>{card.description}</div>
        }
        <div className="id">{card.id}</div>
      </div>
    </CardWrapper>
  )
};

const CardWrapper = styled.div<{color: string}>`
  display: flex;
  width: 90%;
  min-height: 200px;
  background: var(--dark-black);
  margin-top: 1rem;
  padding: 16px 0;
  border-radius: 6px;
  &:before {
    width: 4px;
    height: 100%;
    content: "";
    ${(props) => `background: ${props.color}`};
  }
  .draggable {
    display: grid;
    place-items: center;
    width: 40px;
    svg {
      height: 24px;  
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 12px;
    .title_input {
      width: min-content;
      font-weight: bold;
      font-size: 20px;
      border-radius: 6px;
      color: var(--white);
    }
    .header {
      display: flex;
      .title {
        font-weight: bold;
        font-size: 20px;
        margin-right: 8px;
      }
      .delete {
      }
    }
    .created {
      color: var(--gray)
    }
    .desc {
      flex-grow: 1;
    }
    .desc_input {
      flex-grow: 1;
      height: fit-content;
      vertical-align: text-top;
    }
    .id {
      color: var(--dark-gray);
      font-size: 8px;
    }
  }
`;