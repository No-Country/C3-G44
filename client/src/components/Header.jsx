import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { UserTypes } from '../types/UserTypes';

export const Header = () => {
    const navigate = useNavigate()
    const { stateUser, dispatchUser} = useContext(UserContext);
    const handleLogout = () => {
        dispatchUser({ type: UserTypes.logout });
        navigate('/')
    };
    const handleLogin = () => {
        dispatchUser({ type: UserTypes.login });
        navigate('/porfolio');
    };
    return (
        <section id="header">
            <div className="header">
                <div className="nav-bar">
                    <div className="brand">
                        <a href="#hero">
                            <img src="./img/logo.png" alt="" />
                        </a>
                    </div>
                    <div className="nav-list">
                        <div className="hamburger">
                            <div className="bar"></div>
                        </div>
                        <ul>
                            <li>
                                <a href="#hero" data-after="Home">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" data-after="About">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" data-after="Service">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#projects" data-after="Projects">
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="#contact" data-after="Contact">
                                    Contact
                                </a>
                            </li>
                            <li>
                                {stateUser.auth ? (
                                    <Link onClick={handleLogout} to="/">
                                        Logout
                                    </Link>
                                ) : (
                                    <Link to="/login" onClick={handleLogin}>
                                        Login
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
