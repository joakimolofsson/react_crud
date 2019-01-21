import React, { Component } from 'react';

class Create extends Component {
    state = {
        message: '',
        userInput: {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            userInput: {
                ...this.state.userInput,
                [e.target.name]: e.target.value
            }
        });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.state.userInput.firstname,
                lastname: this.state.userInput.lastname,
                email: this.state.userInput.email,
                username: this.state.userInput.username,
                password: this.state.userInput.password
            })
        }).then(res => {
            return res;
        }).then((data) => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
        this.resetInputFields();
    }

    resetInputFields = () => {
        let resetUserInput = {};        
        for(let key in this.state.userInput) {
            resetUserInput = {...resetUserInput, [key]: ''};
        }
        this.setState({
            userInput: {
                ...resetUserInput
            }
        });
    }

    render() {
        return (
            <div className="Create">
                <h3>Add a new user:</h3>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <p>Firstname:</p>
                    <input type="text" name="firstname" value={this.state.userInput.firstname} onChange={this.handleChange} required/>
                    <br/><br/>
                    <p>Lastname:</p>
                    <input type="text" name="lastname" value={this.state.userInput.lastname} onChange={this.handleChange} required/>
                    <br/><br/>
                    <p>E-mail:</p>
                    <input type="email" name="email" value={this.state.userInput.email} onChange={this.handleChange} required/>
                    <br/><br/>
                    <p>Username:</p>
                    <input type="text" name="username" value={this.state.userInput.username} onChange={this.handleChange} required/>
                    <br/><br/>
                    <p>Password:</p>
                    <input type="password" name="password" value={this.state.userInput.password} onChange={this.handleChange} required/>
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default Create;