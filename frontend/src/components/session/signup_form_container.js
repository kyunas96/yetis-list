import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form'
import { withRouter } from 'react-router';
import { fetchAllPlaylists } from '../../actions/playlist_actions';


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
      <button className="other-button" onClick={() => dispatch(openModal('login'))}>
        login
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
    fetchAllPlaylists: () => dispatch(fetchAllPlaylists())
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm));