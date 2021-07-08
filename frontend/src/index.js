import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout, RECEIVE_CURRENT_USER } from './actions/session_actions';
import { store } from './store/store';

document.addEventListener('DOMContentLoaded', () => {
	const token = window.localStorage.getItem('jwtToken')
	if (token && token !== "undefined") {

		setAuthToken(window.localStorage.getItem('jwtToken'));

		const decodedUser = jwt_decode(window.localStorage.getItem('jwtToken'));

		store.dispatch({type: RECEIVE_CURRENT_USER, currentUser: decodedUser})

		const currentTime = Date.now() / 1000;

		if (decodedUser.exp < currentTime) {
			store.dispatch(logout());
			window.location.href = '/';
		}
	}

	const root = document.getElementById('root');

	ReactDOM.render(<Root store={store} />, root);
});
