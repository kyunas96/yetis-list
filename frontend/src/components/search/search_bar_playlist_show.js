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
        console.log(selectedSong)
		this.props.addSongToPlaylist(
            selectedSong
		).then((res) => {
			this.setState({searchValue: ''})
		})
	}

	setSeed(song) {
        console.log(song)
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
		let list =
			this.state.searchValue !== '' ? (
				<List items={this.props.listItems} setSeed={this.setSeed} />
			) : null;

		return (
			<div className='search'>
				<form className='search-form' onSubmit={this.handleSubmit}>
					<input
						placeholder='Select song to add to playlist'
						className='search-input'
						name='searchValue'
						type='text'
						autoComplete='off'
						onChange={this.updateSearchValue}
						value={this.state.searchValue}
					/>
					<div className='search-list-dropdown'>{list}</div>
					<button className='submit-search-button' type='submit'>
						Add Song to Playlist
					</button>
				</form>
			</div>
		);
	}
}

export default SearchBarPlaylistShow;
