import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import Modal from './modal/modal';
import UserMainPage from './user/main/user_main';
import Footer from './footer/footer';
import './css/fonts.css';

const App = () => (
	<div>
		<NavBarContainer />
		<Modal />
		<Switch>
			<ProtectedRoute path='/users/:id' component={UserMainPage} />
			<AuthRoute exact path='/' component={MainPage} />
		</Switch>
		<Footer />
	</div>
);

export default App;
