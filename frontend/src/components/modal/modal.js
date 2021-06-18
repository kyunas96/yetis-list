import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
import CreatePlaylistContainer from '../playlist/create_playlist_container';
import UpdatePlaylistContainer from '../playlist/update_playlist_container';
import DeletePlaylistContainer from '../playlist/delete_playlist_container';
import AddComment from '../comment/add_comment_container';
import './modal.css';

function Modal({ modal, closeModal }) {
	if (!modal) {
		return null;
	}
	let component;
	switch (modal) {
		case 'login':
			component = <LoginFormContainer />;
			break;
		case 'signup':
			component = <SignupFormContainer />;
			break;
		case 'create-playlist':
			component = <CreatePlaylistContainer />;
			break;
		case 'update-playlist':
			component = <UpdatePlaylistContainer />;
			break;
    case 'add-comment': 
			component = <AddComment />
			break;
    case 'delete-playlist': 
			component = <DeletePlaylistContainer />
			break;
		default:
			return null;
	}

	return (
		<div className='modal-background' onClick={closeModal}>
			<div className='modal-child' onClick={(e) => e.stopPropagation()}>
				{component}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		modal: state.ui.modal,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeModal: () => dispatch(closeModal()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
