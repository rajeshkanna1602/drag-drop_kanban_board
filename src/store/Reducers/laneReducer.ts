import {
  ADD_LANE,
  ADD_LANE_TITLE,
  DELETE_LANE,
  GET_LOCAL_LANE,
} from "../Actions/laneActionsTypes";
import _ from "lodash";
import * as localForage from "localforage";
import { act } from "react-dom/test-utils";

const initialState: any = {
  laneId: 0,
  lanes: [],
};

const laneReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_LANE: {
      const newState = _.cloneDeep(state);
      newState.laneId = newState.laneId + 1;

      newState.lanes.push({
        id: "lane" + newState.laneId,
        title: "Add your title here..",
      });

      localForage.setItem("laneLStore", newState);

      return newState;
    }

    case DELETE_LANE: {
      const newState = _.cloneDeep(state);

      newState.lanes = newState.lanes.filter((lane: any) => {
        return lane.id !== action.payload.id;
      });

      localForage.setItem("laneLStore", newState);
      return newState;
    }
    case GET_LOCAL_LANE: {
      return action.payload.localLane;
    }

    case ADD_LANE_TITLE: {
      const newState = _.cloneDeep(state);

      newState.lanes.map((lane: any) => {
        if (lane.id === action.payload.id) {
          lane.title = action.payload.title;
        }
      });

      localForage.setItem("laneLStore", newState);

      return newState;
    }
    default:
      return state;
  }
};
export default laneReducer;
