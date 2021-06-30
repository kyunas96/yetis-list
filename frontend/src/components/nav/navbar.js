import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

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
				<>
          <div className='nav-title'>
            <Link to={`/users/${this.props.user}`}>
              Yeti's List
            </Link>
          </div>
					<ul className='logged-in-nav'>
						<li>
							<Link
								to={`/users/${this.props.user}/`}
								className='profile-nav-link'>
								Generate A Random Playlist
							</Link>
						</li>
						<li>
							<Link to={`/users/${this.props.user}/profile`}
								onClick={() => this.props.openModal()}
								className='profile-nav-link'>
								Make A Custom Playlist
							</Link>
						</li>
						<li>
							<Link
								to={`/users/${this.props.user}/playlist-feed`}
								className='profile-nav-link'>
								Playlist Feed
							</Link>
						</li>
						<li>
							<Link
								to={`/users/${this.props.user}/profile`}
								className='profile-nav-link'>
								Profile
							</Link>
						</li>
						<li>
							<button
								className='logout-button'
								onClick={() => this.props.logout()}>
								Logout
							</button>
						</li>
					</ul>
				</>
			);
		} else {
			return <div className='nav-title'>Yeti's List</div>;
		}
	}

	render() {
		return <div className='navbar-container'>{this.getLinks()}</div>;
	}
}

export default NavBar;
