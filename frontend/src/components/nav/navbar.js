import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);
  }

  // Selectively render links dependent on whether the user is logged in
  // 
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div>
                <Link to={`/user/${this.props.userId}/playlists-index`}>Go to Playlists</Link> 
                <Link to={`/user/${this.props.userId}/profile`}>Profile</Link>
                <button onClick={() => this.props.logout()}>Logout</button>
            </div>
        );
      } else {
        return (
            <ul>
            </ul>
        );
      }
  }

  render() {
      return (
        <div className="navbar-container">
            <div className="nav-title">
              Yeti's List
            </div>
            <ul className="logged-in-nav">
              <li>
                <Link to={'/'} className="playlist-make-nav">Make a playlist</Link> 
              </li>
              <li>
                <Link to={'/profile'} className="profile-nav-link">Profile</Link>
              </li>
              <li>
                <button className="logout-button" onClick={() => this.props.logout()}>Logout</button>
              </li>
            </ul>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;