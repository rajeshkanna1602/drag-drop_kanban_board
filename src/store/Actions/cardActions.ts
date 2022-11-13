import {
  ADD_CARD,
  DELETE_CARD,
  DRAGED_CARD,
  GET_LOCAL_CARD,
} from "../Actions/cardActionsTypes";

const addCard = (newCard: any) => {
  return {
    type: ADD_CARD,
    payload: {
      newCard,
    },
  };
};

const deleteCard = (id: string) => {
  return {
    type: DELETE_CARD,
    payload: {
      id,
    },
  };
};

const dragedCard = (resultObj: any) => {
  return {
    type: DRAGED_CARD,
    payload: {
      resultObj,
    },
  };
};

const getLocalCard = (localCard: any) => {
  return {
    type: GET_LOCAL_CARD,
    payload: {
      localCard,
    },
  };
};

export { addCard, deleteCard, dragedCard, getLocalCard };
