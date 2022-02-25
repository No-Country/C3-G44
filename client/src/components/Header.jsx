import React, { useContext, useEffect, useRef } from 'react';
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

    const hamburger = useRef(document.querySelector('.header .nav-bar .nav-list .hamburger')) 
    const mobile_menu = useRef(document.querySelector('.header .nav-bar .nav-list ul'))
    
    useEffect(() => {
         hamburger.current = document.querySelector('.header .nav-bar .nav-list .hamburger')
         mobile_menu.current = document.querySelector('.header .nav-bar .nav-list ul')
    }, [])
    

    const handleHamburger = () => {
        hamburger.current.classList.toggle('active')
        mobile_menu.current.classList.toggle('active')
    }
    
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
                        <div className="hamburger" onClick={handleHamburger}>
                            <div className="bar"></div>
                        </div>
                        <ul>
                            <li>
                                <a href="#hero" data-after="Home" onClick={handleHamburger}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" data-after="About" onClick={handleHamburger}>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" data-after="Service" onClick={handleHamburger}>
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#projects" data-after="Projects" onClick={handleHamburger}>
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="#contact" data-after="Contact" onClick={handleHamburger}>
                                    Contact
                                </a>
                            </li>
                            <li>
                                {stateUser.auth ? (
                                    <Link onClick={handleLogout} to="/" data-after="Logout">
                                        Logout
                                    </Link>
                                ) : (
                                    <Link to="/login" onClick={handleLogin} data-after="Login">
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
