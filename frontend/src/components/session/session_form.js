import React from 'react';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(field) {
		return (e) =>
			this.setState({
				[field]: e.currentTarget.value,
			});
	}

	handleSubmit(e) {
        e.preventDefault();
		const user = Object.assign({}, this.state);
        console.log(user)
        console.log(this.props)
		this.props.processForm(user)
		.then((data) => {
			if (this.props.formType === 'signup') {
				this.props.history.push(`/users/${data.currentUser._id}`)
			} else {
				this.props.history.push(`/users/${data._id}`)
			}
		})
		.then(() => this.props.closeModal());
	}

	

	render() {
		let username_input;
		if (this.props.formType === 'signup') {
			username_input = (
				<label>
					Username:
					<input
						type='text'
						value={this.state.username}
						onChange={this.update('username')}
						className='signup-input'
					/>
				</label>
			);
		}
		return (
			<div className='form-container'>
				Welcome to Yeti's List! Please {this.props.formType} or{' '}
				{this.props.otherForm}
				<div onClick={this.props.closeModal} className='close-x'>
					X
				</div>
				<div className='form'>
					<form className='form-box'>
						{username_input ? username_input : <></>}
						<label>
							Email:
							<input
								type='text'
								value={this.state.email}
								onChange={this.update('email')}
								className='input'
							/>
						</label>
						<label>
							Password:
							<input
								type='password'
								value={this.state.password}
								onChange={this.update('password')}
								className='input'
							/>
						</label>
						{this.props.errors ? <div>{this.props.errors[0]}</div> : <div></div>}
						<button className='session-submit' onClick={this.handleSubmit}>
							{this.props.formType}
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default SessionForm;