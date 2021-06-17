import React from 'react';
import { openModal } from '../../actions/modal_actions'
import {connect} from 'react-redux'
import Yeti from '../svg/yeti-component'
import './main.css'

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-body">
        <h1 className="main-title">Yeti's List</h1>
          <div className="site-info">Yeti help friend make music playlist. Please sign up and tell Yeti song/album/genre you like, and Yeti help friend!</div>
          <div className="buttons">
            {this.props.openSignup}
            {this.props.openLogin}
          </div>
          <Yeti />
        <footer className="footer">
          Copyright &copy; 2021 YeticorpLLC
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin:  <button className="login-button" onClick={() => dispatch(openModal('login'))}>login</button>,
    openSignup: <button className="signup-button" onClick={() => dispatch(openModal('signup'))}>Sign Up</button>

  }
}


export default connect(
  null,
  mapDispatchToProps
)(MainPage);

