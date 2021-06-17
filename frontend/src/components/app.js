import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import Modal from './modal/modal';

import MainPage from './main/main_page';
import UserHomePage from './user/main/user_main';
import PlaylistCreatePage from './playlist/playlist_create_page';
import PlaylistShowPage from './playlist/playlist_show_page';
import './css/fonts.css'

const App = () => (
  <>
    <NavBarContainer />
    <Modal />
    <Switch>
        {/* On Playlist Show page: list of songs, comments, likes */}
        <ProtectedRoute exact path='/users/:id/playlist/:playlistId' component={PlaylistShowPage} />
        {/* On Playlist Create page: Searchbar, manual Playlist creator */}
        <ProtectedRoute exact path='/users/:id/create-playlist' component={PlaylistCreatePage} /> 
        {/* On User Home: Searchbar */}
        <ProtectedRoute exact path='/users/:id/' component={UserHomePage} />
        {/* On User Profile: playlist list container, liked playlist container, link to playlist creator page button */}
        {/* <ProtectedRoute exact path='/users/:id/profile' component={UserProfilePage} /> */}
        {/* On Song Show page: song stats, playlists included in */}
        {/* <ProtectedRoute exact path='/users/:id/song/:song-id' component={SongShowPage} /> */}
        
        <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  </>
);

export default App;