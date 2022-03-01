import React, { useState } from "react";
import "./Home.css";

export const Home = () => {
  const [links, setLinks] = useState([]);
  const [toggle, setToggle] = useState(false)

  const enlaces = [false, false, false, false, false, false, false];

  const handleMouseOver = (number) => {
    enlaces.map((link, index) => (links[index] = false));
    enlaces[number] = true;
    setLinks(enlaces);
  };
  
  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div id="body">
      <div className="container-home  ">
        <div className={toggle ? "navigation active" : "navigation"}>
          <ul>
            <li>
              <a href="#">
                <span className="icon">
                  <img src="/img/loguito.png" alt="loguito" />
                </span>
              </a>
            </li>
            <li
              className={links[0] ? "hovered" : ""}
              onMouseOver={() => handleMouseOver(0)}
            >
              <a href="#">
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
              className={links[1] ? "hovered" : ""}
              onMouseOver={() => handleMouseOver(1)}
            >
              <a href="#">
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
              className={links[2] ? "hovered" : ""}
              onMouseOver={() => handleMouseOver(2)}
            >
              <a href="#">
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
              className={links[3] ? "hovered" : ""}
              onMouseOver={() => handleMouseOver(3)}
            >
              <a href="#">
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
              className={links[4] ? "hovered" : ""}
              onMouseOver={() => handleMouseOver(4)}
            >
              <a href="#">
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
              className={links[5] ? "hovered" : ""}
              onMouseOver={() => handleMouseOver(5)}
            >
              <a href="#">
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
              className={links[6] ? "hovered" : ""}
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
        <div className={toggle ? "main active" : "main"}>
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
    </div>
  );
};
