import React from 'react';
import PlaylistProfileList from '../../playlist/playlist_profile_list';
import './user-profile.css'

class UserProfilePage extends React.Component {

	componentDidMount() {
		if (!this.props.currentUser.id) {
			this.props.fetchPlaylists(this.props.currentUser)
		} else {
			this.props.fetchPlaylists(this.props.currentUser.id)
		}
	}

	greeting() {
		const date = new Date()
		const hrs = date.getHours();
		let greet;

		if (hrs >= 5 && hrs <= 11) {
			greet = 'morning';
		} else if (hrs >= 12 && hrs <= 17) {
			greet = 'afternoon';
		} else {
			greet = 'evening';
		}

		return greet;
	}

	render() {
		return (
			<section className='profile-page'>
				<h1 className="user-greeting">Good {this.greeting()} {this.props.currentUser.username}!</h1>
				<PlaylistProfileList />
				{/* <div className='liked-playlist-box'>
					Your liked playlists listed here
				</div> */}
			</section>
		);
	}
}


export default UserProfilePage;