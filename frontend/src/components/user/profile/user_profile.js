import React from 'react';

class UserProfilePage extends React.Component {
	render() {
		return (
			<div>
				<h1 className="main-title">Yeti's List</h1>
				<h1 className="user-greeting">{this.props.currentUser.username} Yeti friend!</h1>
				<div className='your-playlist-box'>
					Your playlists listed here
				</div>
				<div className='liked-playlist-box'>
					Your liked playlists listed here
				</div>
				<div className="average-song-stats">
					Average song stats from playlists here
				</div>
			</div>
		);
	}
}


export default UserProfilePage