import React from "react";

export const Banner = ({ user }) => {
    
    return (
        <section id="hero">
            <div className="hero container">
                <div>
                    <h1>
                        Hola, <span></span>
                    </h1>
                    <h1>
                        mi nombre es <span></span>
                    </h1>
                    <h1>
                        {user.nombreCompleto} <span></span>
                    </h1>
                    <a href="#projects" type="button" className="cta">
                        Portfolio
                    </a>
                </div>
            </div>
        </section>
    );
};
