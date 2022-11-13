import React, { useEffect, useState } from "react";
import Lane from "./components/Lane";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { addLane, getLocalLane } from "./store/Actions/laneActions";
import { dragedCard, getLocalCard } from "./store/Actions/cardActions";
import * as localForage from "localforage";
import Modal from "./components/Model";

function App() {
  const state: any = useSelector((state) => state);
  const { lanesStore } = state;
  const { lanes } = lanesStore;
  const [isOpen, setIsOpen] = useState(false);
  const [addCardDisabled, setCardDisabled] = useState(true);
  const dispatch = useDispatch();

  const dragEndHandler = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      dispatch(dragedCard(result));
    }
  };

  const addLaneHandler = () => {
    dispatch(addLane());
  };

  const addCardHandler = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    lanes && lanes.length && setCardDisabled(false);
  }, [lanes]);

  useEffect(() => {
    localForage.getItem("laneLStore").then((laneLS) => {
      if (laneLS) {
        dispatch(getLocalLane(laneLS));
      }
    });
    localForage.getItem("cardLStore").then((cardLS) => {
      if (cardLS) {
        dispatch(getLocalCard(cardLS));
      }
    });
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={dragEndHandler}>
        <div className="App">
          <div className={"buttonWrapper"}>
            <button
              onClick={addCardHandler}
              className={"addCardBtn"}
              disabled={addCardDisabled}
            >
              Add Card
            </button>
          </div>
          <div className="lane_con">
            {lanes &&
              lanes.map((lane: any) => (
                <Lane key={lane.id} id={lane.id} title={lane.title} />
              ))}

            <div className={"createLane"}>
              <div className={"lane_title_con"}>Create new lane...</div>
              <div className={"add_lane"} onClick={addLaneHandler}>
                +
              </div>
              {/* <div>X</div> */}
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </Provider> */}
      </DragDropContext>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </>
  );
}

export default App;
