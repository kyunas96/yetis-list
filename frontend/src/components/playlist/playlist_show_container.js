import { connect } from 'react-redux';
import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions';
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
      <button onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PLaylistShow));