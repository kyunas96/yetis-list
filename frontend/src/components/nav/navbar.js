import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);
  }

  // Selectively render links dependent on whether the user is logged in

  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      return true;
    } else {
      return false;
    }
  }


  getLinks() {
      if (this.props.loggedIn) {
        return (
            <ul className="logged-in-nav">
              <li>
                <p onClick={() => this.props.openModal()} className="playlist-make-nav">Make a custom playlist</p> 
              </li>
              <li>
                <Link to={`/users/${this.props.user}/playlist-feed`} className="profile-nav-link">Playlist Feed</Link>
              </li>
              <li>
                <Link to={`/users/${this.props.user}/profile`} className="profile-nav-link">Profile</Link>
              </li>
              <li>
                <button className="logout-button" onClick={() => this.props.logout()}>Logout</button>
              </li>
            </ul>
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
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;