import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import Create from './components/Create';
import Update from './components/Update';
import Delete from './components/Delete';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/update" component={Update} />
          <Route exact path="/delete" component={Delete} />
        </div>
      </Router>
    );
  }
}

export default App;
