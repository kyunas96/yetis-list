import { combineReducers } from 'redux';
import widgetReducer from './widget_reducer';

import modal from './modal_reducer';
import searchBarReducer from './search_bar_reducer';

export default combineReducers({
    modal,
    searchBar: searchBarReducer,
    widget: widgetReducer
})