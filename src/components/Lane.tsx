import React, { useState } from "react";
import styles from "./Lane.module.css";
import Card from "./card";
import { Droppable } from "react-beautiful-dnd";
import { deleteLane } from "../store/Actions/laneActions";
import { useSelector, useDispatch } from "react-redux";
import { addLaneTitle } from "../store/Actions/laneActions";

const Lane = (props: any) => {
  const dispatch = useDispatch();
  const state: any = useSelector((state) => state);
  const { cardsStore } = state;
  const { cards } = cardsStore;

  const [laneTitle, setLaneTitle] = useState(props.title);
  const { id } = props;

  const cardHandler = () => {
    if (cards) {
      const cardsData = cards.filter((card: any) => id === card.laneId);
      return cardsData.map((card: any) => <Card {...card} />);
    }
  };

  const laneTitleHandler = (e: any) => {
    setLaneTitle(e.target.value);
  };

  const laneCloseHander = (e: any, id: any) => {
    dispatch(deleteLane(id));
  };

  const onBlurHandler = (e: any, id: any) => {
    dispatch(addLaneTitle(id, laneTitle));
  };

  return (
    <div className={styles.lane}>
      {/* <div>{"land id" + id}</div> */}
      <Droppable droppableId={id}>
        {(provided: any) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.droppableWrapper}
          >
            <div className={styles.lane_title_con}>
              <div>
                <input
                  type="text"
                  value={laneTitle}
                  onChange={laneTitleHandler}
                  className={styles.lane_title_input}
                  onBlur={(e) => onBlurHandler(e, id)}
                />
              </div>
              <button
                onClick={(e) => laneCloseHander(e, id)}
                className={styles.closeBtn}
              >
                X
              </button>
            </div>
            {cardHandler()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Lane;
