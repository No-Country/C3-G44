import React, { useContext } from "react";
import { Service } from "../components/Service";
import { UserContext } from "../context/UserContext";

export const Services = () => {
    const { stateUser } = useContext(UserContext)
    const { user } = stateUser
    const { service } = user
    const services2 = Object.values(service).filter((element) => typeof element === 'object');
    return (
        <section id="services">
            <div className="services container">
                <div className="service-top">
                    <h1 className="section-title">
                        Serv<span>i</span>ces
                    </h1>
                    <p>
                        {service.general}
                    </p>
                </div>
                <div className="service-bottom">
                    {services2.map(({tittle, description}, index) => (
                        <Service key={index} tittle={tittle} text={description} />
                    ))}
                </div>
            </div>
        </section>
    );
};
