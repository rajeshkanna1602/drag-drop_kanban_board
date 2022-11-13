import React, { useRef, useState } from "react";
import styles from "./Modal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../store/Actions/cardActions";

const Modal = ({ setIsOpen }: any) => {
  const state: any = useSelector((state) => state);
  const {
    lanesStore: { lanes },
  } = state;
  const [cardTitle, setCardTitle] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [cardType, setCardType] = useState(1);
  const [cardLane, setCardLane] = useState(lanes[0].id);
  const dispatch = useDispatch();

  const addCardHandler = () => {
    const newCard = {
      title: cardTitle,
      desc: cardDesc,
      laneId: cardLane,
      type: cardType,
    };

    dispatch(addCard(newCard));
    setIsOpen(false);
  };

  const cardTitleHandler = (e: any) => {
    setCardTitle(e.target.value);
  };

  const cardDescHandler = (e: any) => {
    setCardDesc(e.target.value);
  };

  const cardTypeHandler = (e: any) => {
    setCardType(e.target.value);
  };

  const cardLaneHandler = (e: any) => {
    setCardLane(e.target.value);
  };
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          {/* <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div> */}
          <div className={styles.inputWrapper}>
            <div className={styles.inputFields}>
              <label htmlFor="title">Card Title : </label>
              <input
                type="text"
                id="title"
                name="title"
                value={cardTitle}
                onChange={cardTitleHandler}
              ></input>
            </div>
            <div className={styles.inputFields}>
              <label htmlFor="desc">Card Description : </label>
              <input
                type="text"
                id="desc"
                name="desc"
                onChange={cardDescHandler}
              ></input>
            </div>
            <div className={styles.inputFields}>
              <label htmlFor="cardType">Card Type : </label>

              <select name="cardType" id="cardType" onChange={cardTypeHandler}>
                <option value={1}>Feature</option>
                <option value={2}>Bug</option>
                <option value={3}>Request</option>
              </select>
            </div>
            <div className={styles.inputFields}>
              <label htmlFor="whichLane">Where to Place : </label>

              <select
                name="whichLane"
                id="whichLane"
                onChange={cardLaneHandler}
              >
                {lanes &&
                  lanes.map((lane: any) => (
                    <>
                      <option value={lane.id}>{lane.title}</option>
                    </>
                  ))}
              </select>
            </div>
            <div className={styles.inputFields}>
              <button onClick={addCardHandler}>Add Card</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
