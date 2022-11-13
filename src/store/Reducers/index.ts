import { combineReducers } from "redux";

import cardReducer from "./cardReducer";
import laneReducer from "./laneReducer";

const rootReducer = combineReducers({
  cardsStore: cardReducer,
  lanesStore: laneReducer,
});

export default rootReducer;
