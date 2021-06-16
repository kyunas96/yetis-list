import React from 'react'

class SearchBar extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        searchValue: "",
        selectedSeed: "",
        seedType: "track"
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.updateSearchValue = this.updateSearchValue.bind(this);
      this.updateSeedType = this.updateSeedType.bind(this);
    }

    updateSearchValue(e){
      e.preventDefault()
      console.log("Updating search value")
      this.setState({searchValue: e.currentTarget.value}, () => {
          this.props.requestListItems({
            searchValue: this.state.searchValue,
            seedType: this.state.seedType
        })
      })
    }

    updateSeedType(e){
      let selectedIndex = e.target.options.selectedIndex
      let field = e.target.options[selectedIndex].value
      this.setState({seedType: field})
    }

    handleSubmit(e){
      e.preventDefault()
      this.props.sendSeed(this.state.selectedSeed)
    }
    
    // componentWillUnmount(){
    //   this.props.clearUIState()
    // }

    render(){
      return (
      <form onSubmit={this.handleSubmit}>
        <input
        name='searchValue' 
        type='text'
        onChange={this.updateSearchValue}/>
        <div className='search-list-dropdown'>
          {/* <ul>
            {this.props.listItems.map(item => (
              <ListItem item={item} />
            ))}
          </ul> */}
        </div>
        <select onChange={this.updateSeedType}>
          <option value='track'>Track</option>
          <option value='artist'>Artist</option>
          <option value='album'>Album</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
      )
    }
  }

  export default SearchBar