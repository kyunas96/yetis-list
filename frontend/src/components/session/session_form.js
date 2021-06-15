import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        console.log('getting hit')
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(this.props.closeModal)
    }

    renderErrors() {
        return(
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        

        let username_input;
        if (this.props.formType === 'signup') {
            username_input = ( 
                <label>Username:
                    <input type="text" 
                        value={this.state.username}
                        onChange={this.update('username')}
                        className='signup-input'/>
                </label>
            )
        }
        return (
            <div className="login-form-container">
                <form onSubmit={() => this.handleSubmit} className="login-form-box">
                    Welcome to Yeti's List!
                
                Please {this.props.formType} or {this.props.otherForm}
                    <div onClick={this.props.closeModal} className="close-x">
                        X
                    </div>
                    
                    {this.props.errors ?  this.renderErrors() : <ul></ul>}
                    <div className ='login-form'>
                       <br/> 
                        {username_input}
                        <label>Email:
                            <input type='text'
                                value={this.state.email}
                                onChange={this.update('email')}
                                className="login-input"
                            />
                        </label>
                        <br/>
                        <label>Password:
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                className="login-input"
                                />
                        </label>
                        <br/>
                        <input className='session-submit' type='submit' value={this.props.formType} />
                    </div>
                </form>
            </div>
        );
    }

}

export default SessionForm;