import React from "react";

export const Service = ({service}) => {
    return (
        <div className="service-item">
            <div className="icon">
                <img
                    src="https://img.icons8.com/bubbles/100/000000/services.png"
                    alt="icon"
                />
            </div>
            <h2>{service?.title}</h2>
            <h2>{service?.subtitle}</h2>
            <p>{service?.description}</p>
            <p>Desde: {service?.dateinit}</p>
            <p>Hasta: {service?.datefinish} </p>
        </div>
    );
};
