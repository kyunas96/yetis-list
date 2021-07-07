import { connect } from 'react-redux';
import './widget.css';

const PlayerWidget = ({ songId }) => {
	return (
		<div className='widget-player-container'>
			<iframe
				className='widget-player'
				src={`https://open.spotify.com/embed/track/${songId}?theme=0`}
				frameBorder='0'
				allowtransparency='true'
				allow='encrypted-media'></iframe>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		songId: state.ui.widget,
	};
};

export default connect(mapStateToProps)(PlayerWidget);
