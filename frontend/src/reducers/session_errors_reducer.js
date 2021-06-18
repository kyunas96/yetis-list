import {
	RECEIVE_SESSION_ERRORS,
	RECEIVE_CURRENT_USER,
	RECEIVE_USER_LOGOUT
} from '../actions/session_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_SESSION_ERRORS:
			return action.errors;
		case RECEIVE_CURRENT_USER:
			return _nullErrors;
		case RECEIVE_USER_LOGOUT:
			return [];
		default:
			return state;
	}
};

export default SessionErrorsReducer;
