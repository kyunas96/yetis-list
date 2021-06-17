import { combineReducers } from 'redux';

import users from './users_reducer';
import playlists from './playlist_reducer';

export default combineReducers({
  users,
  playlists,
});