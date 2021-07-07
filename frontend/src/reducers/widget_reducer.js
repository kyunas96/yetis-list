import { RECEIVE_SONG_ID, RECEIVE_SONG_ANALYSIS } from "../actions/widget_actions";


const widgetReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    
    switch (action.type) {
        case RECEIVE_SONG_ID:
            newState.songId = action.songId;
            return newState;
        case RECEIVE_SONG_ANALYSIS:
            newState.analysis = action.analysis;
            return newState;
        default:
            return state;
    }
}

export default widgetReducer