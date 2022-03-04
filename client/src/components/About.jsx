import React from 'react';
import { Url } from '../lib/Url';

export const About = ({ user }) => {
    const { _id, aboutme } = user;
    return (
        <section id="about">
            <div className="about container">
                <div className="col-left">
                    <div className="about-img">
                        <img src={`${Url}/user/imagen/${_id}`} alt="img" />
                    </div>
                </div>
                <div className="col-right">
                    <h1 className="section-title">
                        About <span>me</span>
                    </h1>
                    {aboutme && (
                        <>
                            <h2>{aboutme.profesion}</h2>
                            <p>{aboutme.description}</p>
                        </>
                    )}
                    <a href={`${Url}/user/cv/${_id}`} target="_blank" rel="noreferrer" className="cta">
                        Download Resume
                    </a>
                </div>
            </div>
        </section>
    );
};
