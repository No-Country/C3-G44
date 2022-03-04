import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { UserTypes } from '../types/UserTypes';

export const Header = ({ user }) => {
    const navigate = useNavigate();
    const { dispatchUser, stateUser } = useContext(UserContext);

    const { data } = stateUser;
    const { auth } = data;

    const [toggle, setToggle] = useState(false);

    const handleLogout = () => {
        dispatchUser({ type: UserTypes.logout });
        navigate('/');
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <section id="header">
            <div className="header">
                <div className="nav-bar">
                    <div className="brand">
                        <Link to="/" onClick={handleLogout}>
                            <img src="/img/logo_coder.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="nav-list">
                        <div
                            className={
                                toggle ? 'hamburger active' : 'hamburger'
                            }
                            onClick={handleToggle}
                        >
                            <div className="bar"></div>
                        </div>
                        <ul className={toggle ? 'active' : ''}>
                            <li>
                                <a
                                    href="#hero"
                                    data-after="Home"
                                    onClick={handleToggle}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    data-after="About"
                                    onClick={handleToggle}
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    data-after="Service"
                                    onClick={handleToggle}
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#projects"
                                    data-after="Projects"
                                    onClick={handleToggle}
                                >
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    data-after="Contact"
                                    onClick={handleToggle}
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                {auth && (
                                    <Link to="/home" data-after="Back">
                                        Update
                                    </Link>
                                )}
                            </li>
                            <li>
                                {auth && (
                                    <Link
                                        onClick={handleLogout}
                                        to="/"
                                        data-after="Logout"
                                    >
                                        Logout
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
