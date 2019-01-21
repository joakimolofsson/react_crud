import React from 'react';
import './css/Nav.css';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="Nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li className="navBtnBorder"><Link to="/create">Create</Link></li>
                <li className="navBtnBorder"><Link to="/update">Update</Link></li>
                <li><Link to="/delete">Delete</Link></li>
            </ul>
        </div>
    );
}

export default Nav;