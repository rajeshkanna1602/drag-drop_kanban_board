import {
  ADD_CARD,
  DELETE_CARD,
  DRAGED_CARD,
  GET_LOCAL_CARD,
} from "../Actions/cardActionsTypes";
import _ from "lodash";
import * as localForage from "localforage";

const initialState: any = {
  cardId: 0,
  cards: [],
};

const cardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CARD: {
      const newState = _.cloneDeep(state);
      newState.cardId = newState.cardId + 1;
      newState.cards.push({
        ...action.payload.newCard,
        id: "card" + newState.cardId,
      });

      localForage.setItem("cardLStore", newState);
      return newState;
    }

    case DELETE_CARD: {
      const newState = _.cloneDeep(state);

      newState.cards = newState.cards.filter((card: any) => {
        return card.id !== action.payload.id;
      });

      localForage.setItem("cardLStore", newState);

      return newState;
    }
    case DRAGED_CARD: {
      const { source, destination } = action.payload.resultObj;

      const newState = _.cloneDeep(state);

      newState.cards.map((card: any) => {
        if (Number(card.id.replace("card", "")) === source.index) {
          card.laneId = destination.droppableId;
        }
      });

      localForage.setItem("cardLStore", newState);

      return newState;
    }

    case GET_LOCAL_CARD: {
      return action.payload.localCard;
    }

    default:
      return state;
  }
};
export default cardReducer;
