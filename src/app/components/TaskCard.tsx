import {Card, Id} from "@/types";
import styled from "styled-components";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {DraggableIcon} from "@/app/components/icon/DraggableIcon";
import {TrashIcon} from "@/app/components/icon/TrashIcon";

export const TaskCard = ({card, deleteCard}: { card: Card, deleteCard: (id: Id) => void }) => {
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [descEdit, setDescEdit] = useState<boolean>(false);
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const descInputRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
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
    if (inputRef.current != null && inputRef.current?.value != "") {
      if (e.key == "Enter") {
        card.title = inputRef ? inputRef.current.value : card.title;
        setTitleEdit(false);
      }
      if (e.key == "Escape") cancelEditTitle();
    }

  }
  const enterDesc = (e: KeyboardEvent) => {
    if (descInputRef.current != null && descInputRef.current?.value != "") {
      if (e.key == "Enter") {
        card.description = descInputRef.current?.value;
        setDescEdit(false);
      }
      if (e.key == "Escape") cancelEditDesc();
    }
  }

  const cancelEditTitle = () => {
    if (inputRef.current?.value != "") setTitleEdit(false);
  }
  const cancelEditDesc = () => {
    if (descInputRef.current?.value != "") setDescEdit(false);
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

  if (isDragging) {
    return <Overlay color={card.parent.color} ref={setNodeRef} style={style}/>
  }

  return (
    <CardWrapper ref={setNodeRef} style={style}>
      <div className="draggable" {...attributes} {...listeners}>
        <DraggableIcon width={12}/>
      </div>
      <div className="content">
        <div className="header">
          {titleEdit ?
            <input className="title_input"
                   onKeyDown={(e) => enterTitle(e)}
                   onBlur={cancelEditTitle}
                   type="text"
                   ref={inputRef}
            />
            :
            <>
              <div className="title" onClick={() => enterEditTitle()}>
                {card.title}
              </div>
              <button className="delete" onClick={() => {
                deleteCard(card.id)
              }}>
                <TrashIcon color="var(--white)" width={16}/>
              </button>
            </>
        }
      </div>
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

const Overlay = styled.div`
  width: 90%;
  min-height: 150px;
  border-radius: 6px;
  border: solid 4px var(--dark-gray);
  margin-top: 1rem;
  background: var(--black);
  opacity: 0.5;
`;
const CardWrapper = styled.div`
  display: flex;
  width: 90%;
  min-height: 150px;
  background: var(--dark-black);
  margin-top: 1rem;
  padding: 16px 0;
  border-radius: 6px;

  .draggable {
    display: grid;
    place-items: center;
    width: 40px;
    cursor: grab;

    svg {
      height: 24px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 12px;

    .header {
      display: flex;

      .title {
        font-weight: bold;
        font-size: 18px;
        margin-right: 8px;
      }
      .title_input {
        max-width: 200px;
        font-weight: bold;
        font-size: 18px;
        border-radius: 6px;
        color: var(--white);
      }
    }

    .created {
      color: var(--gray)
    }

    .desc {
      flex-grow: 1;
      max-width: 230px;
    }

    .desc_input {
      flex-grow: 1;
      vertical-align: text-top;
      height: auto;
      max-width: 230px;
    }

    .id {
      color: var(--dark-gray);
      font-size: 8px;
    }
  }
`;