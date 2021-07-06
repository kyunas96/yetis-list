import {connect} from 'react-redux'
import React from 'react'
import {withRouter} from "react-router"


class PlayerWidget extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <iframe src={`https://open.spotify.com/embed/track/${this.props.songId}?theme=0`} width="20%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
  