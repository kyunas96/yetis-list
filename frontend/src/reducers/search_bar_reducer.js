import { RECEIVE_LIST_ITEMS, CLEAR_LIST_ITEMS } from "../actions/search_actions";

export default function searchBarReducer(state = [], action){
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_LIST_ITEMS:
      return action.listItems
    case CLEAR_LIST_ITEMS:
      return [];
    default:
      return state;
  }
}