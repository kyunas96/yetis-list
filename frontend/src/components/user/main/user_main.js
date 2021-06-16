import React from 'react'

class UserHomePage extends React.Component {

  render() {
    return (
      <div>
        <h1 className="main-title">Yeti's List</h1>
          <div className="search-info">Yeti help friend! Help Yeti know what song/album/genre friend want playlist like:</div>
          <div className="search-bar">
            Searchbar here
          </div>
        <footer className="footer">
          Copyright &copy; 2021 YeticorpLLC
        </footer>
      </div>
    );
  }
}

export default UserHomePage