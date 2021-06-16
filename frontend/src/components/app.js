import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import Modal from './modal/modal';
import UserHomePage from './user/user_home_page';

const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
    <Switch>
        <ProtectedRoute path='/users/:id' component={UserHomePage} />
        <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;