import React, { useState } from "react";
import "./style.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/actions";

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const signOutReq = () => {
        dispatch(signOut());
    };

    if (isAuthenticated === false) {
        return null;
    }

    return (
        <nav className='navbar' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <NavLink className='navbar-item' to='/'>
                    <img alt='' src='https://bulma.io/images/bulma-logo.png' width='112' height='28' />
                </NavLink>

                <span
                    role='button'
                    className='navbar-burger burger'
                    aria-label='menu'
                    aria-expanded='false'
                    target='navbarBasicExample'
                >
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </span>
            </div>

            <div id='navbarBasicExample' className='navbar-menu'>
                <div className='navbar-start'>
                    <NavLink to='/news' className='navbar-item'>
                        Tin Tức
                    </NavLink>
                </div>

                <div className='navbar-end'>
                    <div className='navbar-item'>
                        <div onClick={signOutReq} className='buttons'>
                            <span className='button is-light'>Log Out</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
