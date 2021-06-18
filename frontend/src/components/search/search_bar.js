import React from "react";
import List from "./list";
import "./search.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      selectedSeed: "",
      seedType: "track",
    };
    console.log(this.props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.updateSeedType = this.updateSeedType.bind(this);
    this.setSeed = this.setSeed.bind(this);
  }

  updateSearchValue(e) {
    e.preventDefault();
    console.log("Updating search value");
    console.log(this.state);
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
    console.log("submitting");
    e.preventDefault();
    this.props.sendSeed({
      seeds: [{ value: this.state.selectedSeed, type: this.state.seedType }],
      options: {},
    });
    this.props.history.push(`/users/${this.props.currentUser}/playlists/current`)
    // add redirect to go to playlist show page
  }

  setSeed(seed, name) {
    this.setState(
      {
        selectedSeed: seed,
        searchValue: name,
      },
      () => {
        console.log(this.state);
        this.props.clearListItems();
      }
    );
  }

  // componentWillUnmount(){
  //   this.props.clearUIState()
  // }

  render() {
    let list =
      this.state.searchValue !== "" ? (
        <List items={this.props.listItems} action={this.setSeed} />
      ) : null;

    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            name="searchValue"
            type="text"
            autoComplete='off'
            onChange={this.updateSearchValue}
            value={this.state.searchValue}
          />
          <div className="search-list-dropdown">{list}</div>
          <select onChange={this.updateSeedType}>
            <option value="track">Track</option>
            <option value="artist">Artist</option>
            <option value="genre">Genre</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
