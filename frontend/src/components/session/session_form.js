import React from "react";
import SessionInput from './session_inputs'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
	this.update = this.update.bind(this);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      }, console.log(this.state));
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    console.log(user);
    console.log(this.props);
    this.props
      .processForm(user)
      .then((data) => {
        if (this.props.formType === "signup") {
          this.props.history.push(`/users/${data.currentUser._id}`);
        } else {
          this.props.history.push(`/users/${data._id}`);
        }
      })
      .then(() => this.props.closeModal());
  }

  render() {
    let username_input;
    if (this.props.formType === "signup") {
      username_input = (
          <SessionInput
		  	title='Username'
            type="text"
            value={this.state.username}
            onChange={this.update("username")}
        
          />
      );
    }
    return (
      <div className="form-container">
        <h1> Welcome to Yeti's List! </h1>
		<h3>{this.props.formType}</h3>
        <form className="form-box">
          {username_input ? username_input : <></>}
            <SessionInput
				title='Email'
				type="text"
				value={this.state.email}
				onChange={this.update("email")}
				className="input"
            />
            <SessionInput
			title='Password'
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              className="input"
            />
          {this.props.errors ? <div>{this.props.errors[0]}</div> : <div></div>}
          <button className="session-submit" onClick={this.handleSubmit}>
            {this.props.formType}
          </button>
        </form>
		<div className='session-form-footer'>
			<p>Not a member yet? {this.props.otherForm}</p>
		</div>
      </div>
    );
  }
}

export default SessionForm;
