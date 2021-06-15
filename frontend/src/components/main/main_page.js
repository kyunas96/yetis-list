import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Yeti's List</h1>
        <button onClick={() => openModal('login')}>
        Login
      </button>
        <button onClick={() => openModal('signup')}>Sign Up</button>
        <footer>
          Copyright &copy; 2021 Arctech
        </footer>
      </div>
    );
  }
}

export default MainPage;