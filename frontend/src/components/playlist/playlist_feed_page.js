import { connect } from "react-redux";
import React from "react";
import {
  fetchAllPlaylists,
  sendPlaylistId,
  deletePlaylist,
} from "../../actions/playlist_actions";
import { withRouter, Link } from "react-router-dom";
import "./playlist_css/playlist-feed.css";

class PlaylistFeedPage extends React.Component {
  constructor(props) {
    super(props);
    const playlists = this.filterOutOwnPlaylists(this.props.playlists);
    this.state = { playlists };
  }

  componentDidMount() {
    this.props.fetchAllPlaylists();
  }

  filterOutOwnPlaylists(playlists) {
    // console.log(playlists)
    const otherPlaylists = [];
    for (const [key, playlist] of Object.entries(playlists)) {
      // console.log(key, playlist)
      if (playlist.userId !== this.props.currentUserId) {
        otherPlaylists.push(playlist);
      }
    }
    // console.log(otherPlaylists)
    return otherPlaylists;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      (!this.state.playlists && nextState.playlists !== this.state.playlists) ||
      nextProps !== this.props
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <section className="playlist-feed-page">
        <div className="feed-header">
          <Link
            id="view-your-playlists"
            to={`/users/${this.props.currentUserId}/profile`}
          >
            View All Of Your Playlists
          </Link>
          <h2 id="view-playlist-text">Select A Playlist Below To View</h2>
          <div className="description-text">
            <h2>Playlist Title</h2>
            <h2>Playlist Description</h2>
          </div>
        </div>
        <ul className="playlist-list-ul">
          {this.state.playlists.length > 0 ? (
            this.state.playlists.map((playlist, i) => {
              return (
                <li
                  key={i}
                  className="playlist-item"
                  id="feed-item"
                  onClick={() => this.props.sendPlaylistId(playlist._id)}
                >
                  <Link
                    to={`/users/${this.props.currentUserId}/playlist/${playlist._id}`}
                  >
                    <h3 className="playlist-profile-title" id="title-feed">
                      {playlist.title}
                    </h3>
                    <h3 className="playlist-profile-description">
                      {playlist.description}
                    </h3>
                  </Link>
                </li>
              );
            })
          ) : (
            <li>
              <h3>No Body Has Any Playlists :(</h3>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playlists: Object.values(state.entities.playlists.allPlaylists),
    currentUserId: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
    sendPlaylistId: (playlistId) => dispatch(sendPlaylistId(playlistId)),
    deletePlaylist: (playlistId) => dispatch(deletePlaylist(playlistId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistFeedPage)
);
