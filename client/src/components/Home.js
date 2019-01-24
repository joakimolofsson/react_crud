import React, { Component } from 'react';
import './css/Home.css';

class Home extends Component {
    state = {
        users: []
    }

    async componentDidMount() {
        /* try {
            const response = await fetch('http://localhost:4000/api/home'),
            responseData = await response.json();
            this.setState({
                users: responseData
            });
        } catch(err) {
            console.log(err);
        } */
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