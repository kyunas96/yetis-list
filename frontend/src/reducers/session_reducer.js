import { RECEIVE_USER_LOGOUT, RECEIVE_CURRENT_USER } from '../actions/session_actions';


const initialState = {
  isAuthenticated: false,
  user: null
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.currentUser._id
      }
    default:
      return state;
  }
}

export default sessionReducer;