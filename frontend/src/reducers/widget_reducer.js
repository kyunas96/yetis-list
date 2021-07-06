import { RECEIVE_SONG_ID } from "../actions/widget_actions";

const widgetReducer = (state = '', action) => {
    Object.freeze(state)
    
    switch (action.type) {
        case RECEIVE_SONG_ID:
            return action.songId
    
        default:
            return state;
    }
}

export default widgetReducer