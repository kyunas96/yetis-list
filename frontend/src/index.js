import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
// import { fetchPlaylists } from './actions/playlist_actions';

document.addEventListener('DOMContentLoaded', () => {
	let store;
	const token = window.localStorage.getItem('jwtToken')
	if (token && token !== "undefined") {
		// console.log('jwtToken present')
		setAuthToken(window.localStorage.getItem('jwtToken'));

		const decodedUser = jwt_decode(window.localStorage.getItem('jwtToken'));

		const preloadedState = {
			entities: { users: decodedUser },
			session: { isAuthenticated: true, user: decodedUser.id },
		};

		store = configureStore(preloadedState);
    	// store.dispatch(fetchPlaylists(decodedUser.id))

		const currentTime = Date.now() / 1000;

		if (decodedUser.exp < currentTime) {
			store.dispatch(logout());
			window.location.href = '/';
		}
	} else {
		store = configureStore({});
	}
	const root = document.getElementById('root');

	ReactDOM.render(<Root store={store} />, root);
});
