import {
    RECEIVE_LIST_ERRORS
} from '../actions/search_actions'

const _nullErrors = [];

const UIErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_LIST_ERRORS:
            return action.errors;
        default:
            return state;
    }
}

export default UIErrorsReducer