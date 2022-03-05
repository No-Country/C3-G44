import React from "react";

export const Service = ({title, text}) => {
    return (
        <div className="service-item">
            <div className="icon">
                <img
                    src="https://img.icons8.com/bubbles/100/000000/services.png"
                    alt="icon"
                />
            </div>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
};
