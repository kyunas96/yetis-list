import React from 'react';
import { openModal } from '../../actions/modal_actions'
import {connect} from 'react-redux'
import {login} from '../../actions/session_actions'
import Yeti from '../svg/yeti-component'
import Tree from '../svg/tree-component'
import './main.css'

class MainPage extends React.Component {

  constructor (props) {
    super(props);

    this.handleDemo = this.handleDemo.bind(this)
  }

  handleDemo () {
    let demoUser = this.props.demoUsers[Math.floor(Math.random()*this.props.demoUsers.length)];
    this.props.demoLogin(demoUser)
      .then((data) => {
        this.props.history.push(`/users/${data._id}`)
      })
  }

  render() {
    return (
      <div className="main-body">
        <h1 className="main-title">Yeti's List</h1>
          <div className="site-info">Yeti help friend make music playlist. Please sign up and tell Yeti song/album/genre you like, and Yeti help friend!</div>
          <div className="buttons">
            {this.props.openSignup}
            {this.props.openLogin}
          </div>
          <button onClick={this.handleDemo} className='demo-button'>Sign in with demo user</button>
          <div className="happy-place">
            <Yeti />
            <Tree />
          </div>
        <footer className="footer">
          Copyright &copy; 2021 YeticorpLLC
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    demoUsers: [{
      email: "yeti@yeti.gov",
      password: "43284423sf"
    },{
      email: "bigfoot@bigfoot.gov",
      password: "47289374jjks"
    // },{
    //   email: "sasquatch@sasquatch.gov",
    //   password: "4328749237fj"
    // },{
    //   email: "sasssssquatch@sasssssquatch.gov",
    //   password: "34892739jf"
    // },{
    //   email: "smallfoot@smallfoot.gov",
    //   password: "432847hf"
    // },{
    //   email: "abomidable@abomidable.gov",
    //   password: "324u348"
    // },{
    //   email: "chewbacca@chewbacca.gov",
    //   password: "342304fs"
    }]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    demoLogin: (user) => dispatch(login(user)),
    openLogin:  <button className="login-button" onClick={() => dispatch(openModal('login'))}>login</button>,
    openSignup: <button className="signup-button" onClick={() => dispatch(openModal('signup'))}>Sign Up</button>

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

