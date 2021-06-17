import { combineReducers } from 'redux';

import users from './users_reducer';
import currentPlaylist from './current_playlist_reducer';

export default combineReducers({
  users,
  currentPlaylist
});