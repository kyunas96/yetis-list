import { connect } from "react-redux";
import { requestListItems, sendSeed, clearListItems} from "../../actions/search_actions";
import SearchBar from "./search_bar";
import { withRouter } from "react-router";

const mSTP = (state) => {
  return {
    listItems: state.ui.searchBar,
    currentUser: state.session.user
  }
};

const mDTP = (dispatch) => ({
  requestListItems: (searchItem) => dispatch(requestListItems(searchItem)),
  sendSeed: (seed) => dispatch(sendSeed(seed)),
  clearListItems: () => dispatch(clearListItems())
});

export default withRouter(connect(mSTP, mDTP)(SearchBar));
