import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Url } from "../lib/Url";


export const About = ({user}) => {
    // const { stateUser } = useContext(UserContext)
    // const { user } = stateUser
    const {_id, aboutme} = user 
    return (
    
        <section id="about">
            <div className="about container">
                <div className="col-left">
                    <div className="about-img">
                        <img
                            src={`${Url}/user/imagen/${_id}`}
                            alt="img"
                        />
                    </div>
                </div>
                <div className="col-right">
                    <h1 className="section-title">
                        About <span>me</span>
                    </h1>
                    <h2>{ aboutme.profesion }</h2>
                    <p>
                        {aboutme.description}
                    </p>
                    <a href="#" className="cta">
                        Download Resume
                    </a>
                </div>
            </div>
        </section>
    );
};
