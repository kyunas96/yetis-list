import React from 'react'
import SearchBarContainer from '../../search/search_bar_container'

class UserHomePage extends React.Component {

  render() {
    return (
      <div>
        <h1 className="main-title">Yeti's List</h1>
          {this.props.logout}
          <div className="search-info">Help Yeti know what song, album, or artist you like</div>
          <div className="search-bar">
            <SearchBarContainer />
          </div>
      </div>
    );
  }
}

export default UserHomePage