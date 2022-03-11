import React from "react";
import { Service } from "../components/Service";

export const Services = ({user}) => {
    const { service } = user
    const services2 = service && Object.values(service).filter((element) => typeof element === 'object');
    return (
        <section id="services">
            <div className="services container">
                <div className="service-top">
                    <h1 className="section-title">
                       Experiencia<span> laboral</span>
                    </h1>
                    {services2 && <p>
                        {service.general}
                    </p>}
                </div>
                <div className="service-bottom">
                    {services2 && services2.map((service, index) => (
                        <Service key={index} service={service}  />
                    ))}
                </div>
            </div>
        </section>
    );
};
