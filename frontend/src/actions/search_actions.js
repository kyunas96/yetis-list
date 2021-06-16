import * as APIUtil from '../util/search_api_util'


export const SUBMIT_SEED = 'SUBMIT_SEED'
export const GET_LIST_ITEMS = 'GET_LIST_ITEMS'
export const RECEIVE_LIST_ITEMS = "RECEIVE_LIST_ITEMS"
export const RECEIVE_LIST_ERRORS = 'RECEIVE_LIST_ERRORS'

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


export const sendSeed = (seedData) => dispatch => (
    APIUtil.submitSeed(seedData).then(
        (playlist) => console.log(playlist),
        (err) => dispatch(receiveListErrors(err.response.data))
    )
)

export const requestListItems = (searchItem) => dispatch => (
    APIUtil.getListItems(searchItem).then(
        (listItems) => console.log(listItems),
        (err) => dispatch(receiveListErrors(err.response.data))
    )
)