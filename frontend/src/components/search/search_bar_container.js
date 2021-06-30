import { requestListItems, sendSeed, clearListItems, sendDescriptionDetails } from "../../actions/search_actions";
import SearchBar from "./search_bar";
import { withRouter } from "react-router";
import { connect } from "react-redux";

const mSTP = (state) => {
  return {
    listItems: state.ui.searchBar,
    currentUser: state.session.user
  }
};

const mDTP = (dispatch) => ({
  requestListItems: (searchItem) => dispatch(requestListItems(searchItem)),
  sendSeed: (seed) => dispatch(sendSeed(seed)),
  sendDescriptionDetails: (details) => dispatch(sendDescriptionDetails(details)),
  clearListItems: () => dispatch(clearListItems())
});

export default withRouter(connect(mSTP, mDTP)(SearchBar));
