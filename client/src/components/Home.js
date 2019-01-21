import React, { Component } from 'react';
import './css/Home.css';

class Home extends Component {
    state = {
        users: []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:4000/api/get');
        const json = await response.json();
        
        this.setState({
            users: json
        });
    }

    render() {
        return (
            <div className="Home">
                <h3>User List:</h3>
                {
                    this.state.users.map(data => {
                        return (
                            <div key={data._id} className="userList">
                                <p>Firstname: {data.firstname}</p>
                                <p>Lastname: {data.lastname}</p>
                                <p>E-mail: {data.email}</p>
                                <p>Username: {data.username}</p>
                                <p>Password: {data.password}</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Home;