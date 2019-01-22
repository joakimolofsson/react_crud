import React, { Component } from 'react';
import './css/Login.css';

class Login extends Component {
    state = {
        message: '',
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }),
            responseData = await response.json();
            this.handleResponseData(responseData);
        } catch(err) {
            //console.log(err);
            this.setState({
                message: 'Something went wrong!'
            });
        }
    }

    handleResponseData = (responseData) => {
        switch(responseData.status) {
            case 'OK':
                this.setState({
                    message: `Welcome ${responseData.userData.firstname}!`
                });
                break;
            case 'NOMATCH':
                this.setState({
                    message: 'Wrong username or password!'
                });
                break;
            case 'ERROR':
                this.setState({
                    message: 'Something went wrong!'
                });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="Login">
                <p>{this.state.message}</p>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <p>Username:</p>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>
                    <br/><br/>
                    <p>Password:</p>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                    <br/><br/>
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;