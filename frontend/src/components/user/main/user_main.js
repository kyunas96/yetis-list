import React from 'react'
import Yeti from '../../svg/yeti-component'
import Tree from '../../svg/tree-component'

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
        <footer className="footer">
          Copyright &copy; 2021 YeticorpLLC
        </footer>
      </div>
    );
  }
}

export default UserHomePage