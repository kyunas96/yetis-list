import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';
import { withRouter } from 'react-router';


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    formType: 'login'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
    otherForm: (
      <button className="other-button" onClick={() => dispatch(openModal('signup'))}>
        signup
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm));