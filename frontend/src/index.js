import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import jwt_decode from 'jwt-decode';
import { persistStore } from 'redux-persist';
import { setAuthToken } from './util/session_api_util';
import { logout, RECEIVE_CURRENT_USER } from './actions/session_actions';
import { store } from './store/store';
// import { fetchPlaylists } from './actions/playlist_actions';

document.addEventListener('DOMContentLoaded', () => {
	const token = window.localStorage.getItem('jwtToken')
	if (token && token !== "undefined") {

		setAuthToken(window.localStorage.getItem('jwtToken'));

		const decodedUser = jwt_decode(window.localStorage.getItem('jwtToken'));


		// rather than have this information preloaded into the state, have the 
		// store dispatch the actions to set this information in the store

		// const preloadedState = {
		// 	entities: { users: decodedUser },
		// 	session: { isAuthenticated: true, user: decodedUser.id },
		// };

		// store = configureStore(preloadedState);

		// RECEIVE_CURRENT_USER is defined in both the user and session reducer,
		// therefore both will store the information upon interception the
		// action.type
		store.dispatch({type: RECEIVE_CURRENT_USER, currentUser: decodedUser})

		const persistor = persistStore(store);

		const currentTime = Date.now() / 1000;

		if (decodedUser.exp < currentTime) {
			store.dispatch(logout());
			window.location.href = '/';
		}
	} else {
		// store = configureStore({});
	}
	const root = document.getElementById('root');

	ReactDOM.render(<Root store={store} />, root);
});
