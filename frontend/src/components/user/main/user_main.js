import React from 'react'
import SearchBarContainer from '../../search/search_bar_container';
import Yeti from '../../svg/yeti-component'
import Tree from '../../svg/tree-component'
import './user_main.css'

class UserHomePage extends React.Component {

  render() {
    return (
      <div className="main-body">
        <h1 className="main-title">Yeti's List</h1>
          <div className="search-info">
            Yeti help friend! Help Yeti know what song/album/genre friend want playlist like:
            <div className="search-bar">
              Searchbar here
            </div>
          </div>
          <div className="happy-place">
            <Yeti />
            <Tree />
          </div>
      </div>
    );
  }
}

export default UserHomePage