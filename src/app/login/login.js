import React from 'react';
import axios from 'axios';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.onLogin = this.onLogin.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        })
    }
    onLogin(event) {
        const {onTokenChanged} = this.props;
        event.preventDefault();
        axios.post('https://jr-001-pawpatrol-course-api.herokuapp.com/api/Users/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            onTokenChanged(res.data.id);
            this.props.history.push('/');
        })
    }
    render() {
        const { onTokenChanged, history } = this.props;
        return (
            <form className="container">
                <div className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" 
                            value={this.state.username} 
                            name="username" 
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" 
                            name="password" 
                            value={this.state.pasword} 
                            onChange={this.onInputChange}
                        />
                    </div>
                    <button className="btn btn-lg btn-primary btn-block"
                        onClick={this.onLogin}
                    >Sign in</button>
                </div>
            </form>
        );
    }
}