import { connect } from 'react-redux'
import {requestListItems, sendSeed} from '../../actions/search_actions'
import SearchBar from './search_bar'

const mSTP = state => ({
    listItems: state.ui.search
  })
  const mDTP = dispatch => ({
    requestListItems: searchItem => dispatch(requestListItems(searchItem)),
    sendSeed: seed => dispatch(sendSeed(seed))
  })
  export default connect(null, mDTP)(SearchBar);