import { connect } from "react-redux";
import { requestListItems, sendSeed, clearListItems} from "../../actions/search_actions";
import { addSongToPlaylist, fetchPlaylists } from "../../actions/playlist_actions";
import SearchBar from "./search_bar_playlist_show";
import { withRouter } from "react-router";

const mSTP = (state) => {
  return {
    listItems: state.ui.searchBar,
    currentUser: state.session.user
  }
};

const mDTP = (dispatch) => ({
  requestListItems: (searchItem) => dispatch(requestListItems(searchItem)),
  sendSeed: (seed) => dispatch(sendSeed(seed)),
  clearListItems: () => dispatch(clearListItems()),
  addSongToPlaylist: (song) => dispatch(addSongToPlaylist(song)),
  fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
});

export default withRouter(connect(mSTP, mDTP)(SearchBar));
