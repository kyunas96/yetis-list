import {connect} from 'react-redux'
import React from 'react'
import {withRouter} from "react-router"
import './widget.css'

class PlayerWidget extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <>
      <div className="widget-player-container">
        <iframe className="widget-player" src={`https://open.spotify.com/embed/track/${this.props.songId}?theme=0`} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <img className="widget-toggle" src="https://image.flaticon.com/icons/png/512/808/808531.png"/>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    songId: state.ui.widget
  };
};
  
export default withRouter(
  connect(mapStateToProps)(PlayerWidget)
);
  