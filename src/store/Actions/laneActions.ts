import {
  ADD_LANE,
  DELETE_LANE,
  GET_LOCAL_LANE,
  ADD_LANE_TITLE,
} from "../Actions/laneActionsTypes";

const addLane = () => {
  return {
    type: ADD_LANE,
  };
};

const deleteLane = (id: number) => {
  return {
    type: DELETE_LANE,
    payload: {
      id,
    },
  };
};

const getLocalLane = (localLane: any) => {
  return {
    type: GET_LOCAL_LANE,
    payload: {
      localLane,
    },
  };
};

const addLaneTitle = (id: string, title: string) => {
  return {
    type: ADD_LANE_TITLE,
    payload: {
      id,
      title,
    },
  };
};

export { addLane, deleteLane, getLocalLane, addLaneTitle };
