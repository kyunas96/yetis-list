import React from 'react';
import { Link } from 'react-router-dom'


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
                <Link to={`/users/${this.props.userId}/playlists-index`}>Go to Playlists</Link> 
                <Link to={`/users/${this.props.userId}/profile`}>Profile</Link>
                <button onClick={() => this.props.logout()}>Logout</button>
            </div>
        );
      } else {
        return (
            <div>
            </div>
        );
      }
  }

  render() {
      return (
        <div>
            <h1>Yeti's List</h1>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;