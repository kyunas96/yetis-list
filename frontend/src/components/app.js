import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import Modal from './modal/modal';
import UserHomePage from './user/main/user_main';
import Footer from './footer/footer';
import './css/fonts.css';

const App = () => (
  <>
    <NavBarContainer />
    <Modal />
    <Switch>
        {/* On User Home: Searchbar */}
        <ProtectedRoute path='/users/:id/' component={UserHomePage} />
        {/* On User Profile: playlist list container, liked playlist container, link to playlist creator page button */}
        {/* <ProtectedRoute path='/users/:id/profile' component={UserProfilePage} /> */}
        {/* On Playlist Create page: Searchbar, manual Playlist creator */}
        {/* <ProtectedRoute path='/users/:id/create-playlist' component={PlaylistCreatePage} />  */}
        {/* On Playlist Show page: list of songs, comments, likes */}
        {/* <ProtectedRoute path='/users/:id/playlist/:playlist-id' component={PlaylistShowPage} /> */}
        {/* On Song Show page: song stats, playlists included in */}
        {/* <ProtectedRoute path='/users/:id/song/:song-id' component={SongShowPage} /> */}
        
        <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  </>
);

export default App;
