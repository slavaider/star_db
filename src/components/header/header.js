/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import './header.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className="header d-flex">
            <h3>
                <NavLink exact to='/people/1'>
                    Star DB
                </NavLink>
            </h3>
            <ul className="d-flex">
                <li>
                    <NavLink exact to='/people/1'>
                        People
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to='/planets/1'>
                        Planets
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to='/starships/2'>
                        Starships
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;
