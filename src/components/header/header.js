/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import './header.css';
import {NavLink} from "react-router-dom";
const repo_name = 'star_db'
const Header = () => {
    return (
        <div className="header d-flex">
            <h3>
                <NavLink exact to={`/${repo_name}/people/1`}>
                    Star DB
                </NavLink>
            </h3>
            <ul className="d-flex">
                <li>
                    <NavLink exact to={`/${repo_name}/people/1`}>
                        People
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to={`/${repo_name}/planets/1`}>
                        Planets
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to={`/${repo_name}/starships/2`}>
                        Starships
                    </NavLink>
                </li>
                <li>
                    <a href='https://github.com/slavaider'>
                        <i className='fa fa-github'/>&nbsp;
                        Slavaider
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Header;
