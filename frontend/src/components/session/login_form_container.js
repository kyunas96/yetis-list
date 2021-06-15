import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';


const mapStateToProps = (state) => {
  console.log(state)
  return {
    errors: state.errors.session,
    formType: 'login'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
    otherForm: (
      <button onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);