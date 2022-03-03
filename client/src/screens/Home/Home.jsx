import React, { useState } from 'react';
import { About } from '../About/About';
import { Contact } from '../Contact/Contact';
import { Footer } from '../Footer/Footer';
import { Origin } from '../Origin/Origin';
import { Projects } from '../Projects/Projects';
import { Service } from '../Service/Service';
import './Home.css';

export const Home = () => {
    const [links, setLinks] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [tabPanel, setTabPanel] = useState(null);

    const enlaces = [false, false, false, false, false, false, false];

    const handleMouseOver = (number) => {
        enlaces.map((link, index) => (links[index] = false));
        enlaces[number] = true;
        setLinks(enlaces);
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleTabPanel = (number) => {
        setTabPanel(number);
        console.log(number);
    };

    return (
        <div id="body">
            <div className="container-home  ">
                <div className={toggle ? 'navigation active' : 'navigation'}>
                    <ul>
                        <li>
                            <a href="##" onClick={() => handleTabPanel(null)}>
                                <span className="icon">
                                    <img src="/img/loguito.png" alt="loguito" />
                                </span>
                            </a>
                        </li>
                        <li
                            className={links[0] ? 'hovered' : ''}
                            onMouseOver={() => handleMouseOver(0)}
                        >
                            <a href="#intro" onClick={() => handleTabPanel(0)}>
                                <span className="icon">
                                    <img
                                        src="https://img.icons8.com/bubbles/50/000000/home-page.png"
                                        alt="home"
                                    />
                                </span>
                                <span className="title">Intro</span>
                            </a>
                        </li>
                        <li
                            className={links[1] ? 'hovered' : ''}
                            onMouseOver={() => handleMouseOver(1)}
                        >
                            <a href="#about" onClick={() => handleTabPanel(1)}>
                                <span className="icon">
                                    <img
                                        src="https://img.icons8.com/bubbles/50/000000/gender-neutral-user.png"
                                        alt="user"
                                    />
                                </span>
                                <span className="title">About Me</span>
                            </a>
                        </li>
                        <li
                            className={links[2] ? 'hovered' : ''}
                            onMouseOver={() => handleMouseOver(2)}
                        >
                            <a
                                href="#services"
                                onClick={() => handleTabPanel(2)}
                            >
                                <span className="icon">
                                    <img
                                        src="https://img.icons8.com/bubbles/50/000000/services.png"
                                        alt="services"
                                    />
                                </span>
                                <span className="title">Services</span>
                            </a>
                        </li>
                        <li
                            className={links[3] ? 'hovered' : ''}
                            onMouseOver={() => handleMouseOver(3)}
                        >
                            <a
                                href="#projects"
                                onClick={() => handleTabPanel(3)}
                            >
                                <span className="icon">
                                    <img
                                        src="https://img.icons8.com/bubbles/50/000000/project-setup.png"
                                        alt="project"
                                    />
                                </span>
                                <span className="title">Projects</span>
                            </a>
                        </li>
                        <li
                            className={links[4] ? 'hovered' : ''}
                            onMouseOver={() => handleMouseOver(4)}
                        >
                            <a
                                href="#contact"
                                onClick={() => handleTabPanel(4)}
                            >
                                <span className="icon">
                                    <img
                                        src="https://img.icons8.com/bubbles/50/000000/contacts.png"
                                        alt="contacts"
                                    />
                                </span>
                                <span className="title">Contact</span>
                            </a>
                        </li>
                        <li
                            className={links[5] ? 'hovered' : ''}
                            onMouseOver={() => handleMouseOver(5)}
                        >
                            <a href="#footer" onClick={() => handleTabPanel(5)}>
                                <span className="icon">
                                    <img
                                        src="https://img.icons8.com/bubbles/50/000000/file.png"
                                        alt="file"
                                    />
                                </span>
                                <span className="title">Footer</span>
                            </a>
                        </li>
                        <li
                            className={links[6] ? 'hovered' : ''}
                            onMouseOver={() => handleMouseOver(6)}
                        >
                            <a href="#">
                                <span className="icon">
                                    <img
                                        src="https://img.icons8.com/bubbles/50/000000/cancel.png"
                                        alt="cancel"
                                    />
                                </span>
                                <span className="title">Salir</span>
                            </a>
                        </li>
                    </ul>
                </div>
                {/* <!-- main --> */}
                <div className={toggle ? 'main active' : 'main'}>
                    <div className="topbar">
                        <div className="toggle" onClick={handleToggle}>
                            <img
                                className="menu-outline"
                                src="https://img.icons8.com/bubbles/50/000000/hamburger.png"
                                alt="hamburger"
                            />
                        </div>
                    </div>
                    <div className="cardBox"></div>
                </div>
            </div>
            <div className="tab-panel container">
                {tabPanel === 0 ? (
                    <Origin />
                ) : tabPanel === 1 ? (
                    <About />
                ) : tabPanel === 2 ? (
                    <Service />
                ) : tabPanel === 3 ? (
                    <Projects />
                ) : tabPanel === 4 ? (
                    <Contact />
                ) : tabPanel === 5 ? (
                    <Footer />
                ) : (
                    <div className="container" />
                )}
            </div>
        </div>
    );
};
