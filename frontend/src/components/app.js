import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import Modal from './modal/modal';


import ContactPage from './contact/contact_page'
import Footer from './footer/footer'
import MainPage from './main/main_page';
import UserMainPage from './user/main/user_main_container';
import PlaylistCreatePage from './playlist/playlist_create_page';
import PlaylistShowPage from './playlist/playlist_show_page';
import CurrentPlaylistShow from './playlist/current_playlist_show_page';
import PlaylistFeedPage from './playlist/playlist_feed_page';
import UserProfilePage from './user/profile/user_profile_container'
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
        {/* On Song Show page: song stats, playlists included in */}
        {/* <ProtectedRoute exact path='/users/:id/song/:song-id' component={SongShowPage} /> */}
        {/* On User Profile: playlist list container, liked playlist container, link to playlist creator page button */}
        <ProtectedRoute exact path='/users/:id/playlists/current' component={CurrentPlaylistShow} />
        {/* On User Profile: playlist list container, liked playlist container, link to playlist creator page button */}
        <ProtectedRoute exact path='/users/:id/playlist-feed' component={PlaylistFeedPage} />
        {/* On User Profile: playlist list container, liked playlist container, link to playlist creator page button */}
        <ProtectedRoute exact path='/users/:id/profile' component={UserProfilePage} />
        {/* On User Home: Searchbar */}
        <ProtectedRoute exact path='/users/:id/' component={UserMainPage} />
        
        <Route exact path='/contactUs' component={ContactPage}/>

        <AuthRoute exact path="/" component={MainPage} />
    </Switch>
    <Footer />
  </>
);

export default App;
