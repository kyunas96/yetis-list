import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form'
import { withRouter } from 'react-router';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    formType: 'signup'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(signup(user)),
    otherForm: (
      <button onClick={() => dispatch(openModal('login'))}>
        Login
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm));