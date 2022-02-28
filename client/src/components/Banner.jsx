import React from "react";

export const Banner = ({ user }) => {
    
    return (
        <section id="hero">
            <div className="hero container">
                <div>
                    <h1>
                        Hello, <span></span>
                    </h1>
                    <h1>
                        My Name is <span></span>
                    </h1>
                    <h1>
                        {user.nombreCompleto} <span></span>
                    </h1>
                    <a href="#projects" type="button" className="cta">
                        Porfolio
                    </a>
                </div>
            </div>
        </section>
    );
};
