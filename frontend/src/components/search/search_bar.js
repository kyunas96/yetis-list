import React from 'react';
import List from './list';
import './search.css';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			selectedSeed: '',
			seedType: 'track',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateSearchValue = this.updateSearchValue.bind(this);
		this.updateSeedType = this.updateSeedType.bind(this);
		this.setSeed = this.setSeed.bind(this);
	}

	componentDidMount() {
		const searchInput = document.getElementsByClassName('search-input')[0];
		searchInput.focus();
	}

	updateSearchValue(e) {
		e.preventDefault();

		this.setState({ searchValue: e.currentTarget.value }, () => {
			this.props.requestListItems({
				searchValue: this.state.searchValue,
				seedType: this.state.seedType,
			});
		});
	}

	updateSeedType(e) {
		let selectedIndex = e.target.options.selectedIndex;
		let field = e.target.options[selectedIndex].value;
		this.setState({ seedType: field }, () => {
			this.props.requestListItems({
				searchValue: this.state.searchValue,
				seedType: this.state.seedType,
			});
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.sendSeed({
				seeds: [{ value: this.state.selectedSeed, type: this.state.seedType }],
				options: {},
			})
			.then(() => {
				this.props.sendDescriptionDetails({
					searchValue: this.state.searchValue,
					seedType: this.state.seedType,
				});
				this.props.history.push(
					`/users/${this.props.currentUser}/playlists/current`
				);
			});
	}

	setSeed(seed, name) {
		this.setState(
			{
				selectedSeed: seed,
				searchValue: name,
			},
			() => {
				this.props.clearListItems();
			}
		);
	}

	render() {
		let list =
			this.state.searchValue !== '' ? (
				<List items={this.props.listItems} action={this.setSeed} />
			) : null;

		let formattedSeedType;

		if (this.state.seedType === 'track') {
			formattedSeedType = 'songs';
		} else if (this.state.seedType === 'artist') {
			formattedSeedType = 'artists';
		} else if (this.state.seedType === 'genre') {
			formattedSeedType = 'genres';
		}

		return (
			<div className='search'>
				<form className='search-form' onSubmit={this.handleSubmit}>
					<label htmlFor='select-search-value'>Search by:</label>
					<select
						id='select-search-value'
						className='search-value-dropdown'
						onChange={this.updateSeedType}>
						<option className='dropdown-option' value='track'>
							Song
						</option>
						<option className='dropdown-option' value='artist'>
							Artist
						</option>
						<option className='dropdown-option' value='genre'>
							Genre
						</option>
					</select>
					<input
						placeholder={`Search for ${formattedSeedType}`}
						className='search-input'
						name='searchValue'
						type='text'
						autoComplete='off'
						onChange={this.updateSearchValue}
						value={this.state.searchValue}
					/>
					<div className='search-list-dropdown'>{list}</div>
					<button className='submit-search-button' type='submit'>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default SearchBar;
