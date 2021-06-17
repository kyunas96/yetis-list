import React from "react";
import List from "./list";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      selectedSeed: "",
      seedType: "track",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.updateSeedType = this.updateSeedType.bind(this);
    this.setSeed = this.setSeed.bind(this);
  }

  updateSearchValue(e) {
    e.preventDefault();
    console.log("Updating search value");
    if (e.currentTarget.value === "") {
      this.props.clearListItems();
    } else {
      this.setState({ searchValue: e.currentTarget.value }, () => {
        this.props.requestListItems({
          searchValue: this.state.searchValue,
          seedType: this.state.seedType,
        });
      });
    }
  }

  updateSeedType(e) {
    let selectedIndex = e.target.options.selectedIndex;
    let field = e.target.options[selectedIndex].value;
    this.setState({ seedType: field });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendSeed([
      {
        value: this.state.selectedSeed,
        type: this.state.seedType,
      },
    ]);
  }

  setSeed(seed) {
    this.setState({ selectedSeed: seed }, console.log(this.state));
  }

  // componentWillUnmount(){
  //   this.props.clearUIState()
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="searchValue"
          type="text"
          onChange={this.updateSearchValue}
        />
        <div className="search-list-dropdown">
          <List items={this.props.listItems} action={this.setSeed} />
        </div>
        <select onChange={this.updateSeedType}>
          <option value="track">Track</option>
          <option value="artist">Artist</option>
          <option value="genre">Genre</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SearchBar;
