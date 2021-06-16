import React from 'react';
import { openModal } from '../../actions/modal_actions'
import {connect} from 'react-redux'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Yeti's List</h1>
        {this.props.openLogin}
        {this.props.openSignup}
        <footer>
          Copyright &copy; 2021 Arctech
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin:  <button onClick={() => dispatch(openModal('login'))}>login</button>,
    openSignup: <button onClick={() => dispatch(openModal('signup'))}>Sign Up</button>

  }
}


export default connect(
  null,
  mapDispatchToProps
)(MainPage);

