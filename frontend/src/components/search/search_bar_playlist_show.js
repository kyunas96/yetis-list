import React from 'react';
import List from '../search/list';
import '../playlist/playlist_css/playlist-show-page.css'

class SearchBarPlaylistShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			selectedSeed: '',
		};
		//   seedType: "track",

		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateSearchValue = this.updateSearchValue.bind(this);
		this.setSeed = this.setSeed.bind(this);
	}

	updateSearchValue(e) {
		e.preventDefault();
		// console.log("Updating search value");
		// console.log(this.state);
		this.setState({ searchValue: e.currentTarget.value }, () => {
			this.props.requestListItems({
				searchValue: this.state.searchValue,
				seedType: 'track',
			});
		});
	}

	handleSubmit(e) {
		e.preventDefault();
        const selectedSong = Object.assign({}, this.state.selectedSeed);
        selectedSong.playlistId = this.props.playlistId;
        // console.log(selectedSong)
		this.props.addSongToPlaylist(selectedSong)
			.then((res) => {
				this.props.fetchPlaylists(this.props.currentUser)
				this.setState({searchValue: ''})
			})
	}

	setSeed(song) {
		this.setState(
			{
				selectedSeed: song,
				searchValue: song.name,
			},
			() => {
				// console.log(this.state);
				this.props.clearListItems();
			}
		);
	}

	// componentWillUnmount(){
	//   this.props.clearUIState()
	// }

	render() {
		let list = null;
		let disabled = true;
		if (this.state.searchValue !== '') { 
			list = <List items={this.props.listItems} setSeed={this.setSeed} />;
			disabled = false;
		}

		return (
			<div className='search'>
				<form className='search-form' onSubmit={this.handleSubmit}>
					<input
						placeholder='Search for songs'
						className='search-input'
						name='searchValue'
						type='text'
						autoComplete='off'
						onChange={this.updateSearchValue}
						value={this.state.searchValue}
					/>
					<div className='search-list-dropdown'>{list}</div>
					<button disabled={disabled} className='submit-search-button' type='submit'>
						Add Song
					</button>
				</form>
			</div>
		);
	}
}

export default SearchBarPlaylistShow;
