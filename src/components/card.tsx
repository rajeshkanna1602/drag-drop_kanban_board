import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./card.module.css";
import { deleteCard } from "../store/Actions/cardActions";
import { useDispatch } from "react-redux";

const Card = (props: any) => {
  const { title, desc, id, laneId, type } = props;
  const dispatch = useDispatch();

  const cardCloseHandler = () => {
    dispatch(deleteCard(id));
  };

  const colorCode = () => {
    if (Number(type) === 1) {
      return styles.cardType_1;
    }
    if (Number(type) === 2) {
      return styles.cardType_2;
    }
    if (Number(type) === 3) {
      return styles.cardType_3;
    }
  };

  return (
    <Draggable draggableId={laneId + id} index={Number(id.replace("card", ""))}>
      {(provided) => (
        <div
          className={styles.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.card_title_con}>
            <div>
              {/* <span>{"."}</span> */}
              <div className={`${styles.cardType} ${colorCode()}`}></div>
              {title}
            </div>
            <div onClick={cardCloseHandler}>X</div>
          </div>
          <div className={styles.card_desc}>{desc}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
