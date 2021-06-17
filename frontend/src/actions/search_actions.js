import * as APIUtil from '../util/search_api_util'

export const SUBMIT_SEED = 'SUBMIT_SEED';
export const GET_LIST_ITEMS = 'GET_LIST_ITEMS';
export const RECEIVE_LIST_ITEMS = 'RECEIVE_LIST_ITEMS';
export const RECEIVE_LIST_ERRORS = 'RECEIVE_LIST_ERRORS';
export const CLEAR_LIST_ITEMS = 'CLEAR_LIST_ITEMS';
export const RECEIVE_CURRENT_PLAYLIST = 'RECEIVE_CURRENT_PLAYLIST';
export const CLEAR_CURRENT_PLAYLIST = 'CLEAR_CURRENT_PLAYLIST';

export const submitSeed = (seedData) => ({
    type: SUBMIT_SEED,
    seedData
})

export const getListItems = (searchItem) => ({
    type: GET_LIST_ITEMS,
    searchItem
})

export const receiveListItems = (listItems) => ({
    type: RECEIVE_LIST_ITEMS,
    listItems
})

export const receiveListErrors = (errors) => ({
    type: RECEIVE_LIST_ERRORS,
    errors
})

export const receiveCurrentPlaylist = playlist => ({
    type: RECEIVE_CURRENT_PLAYLIST,
    playlist
})

export const clearCurrentPlaylist = () => ({
    type: CLEAR_CURRENT_PLAYLIST
})

export const sendSeed = (seedData) => dispatch => (
    APIUtil.submitSeed(seedData).then(
        (payload) => dispatch(receiveCurrentPlaylist(payload.data)),
        (err) => dispatch(receiveListErrors(err.response.data))
    )
)

export const requestListItems = (searchItem) => dispatch => (
    APIUtil.getListItems(searchItem).then(
        (payload) => dispatch(receiveListItems(payload.data)),
        (err) => dispatch(receiveListErrors(err.response.data))
    )
)

export const clearListItems = () => dispatch => (
    dispatch({type: CLEAR_LIST_ITEMS})
)

// entities : {
//     currentPlaylist : {

//     }
// }