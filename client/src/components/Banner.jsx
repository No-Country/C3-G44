import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Banner = () => {
    const { stateUser } = useContext(UserContext)
    const {user} = stateUser
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
