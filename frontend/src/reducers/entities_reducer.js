import { combineReducers } from 'redux';

import users from './users_reducer';
import currentPlaylist from './current_playlist_reducer';
import playlists from './playlist_reducer';

export default combineReducers({
  users,
  playlists,
  currentPlaylist
});
