import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from "../actions/session_actions"

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser
        case RECEIVE_USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export default usersReducer;