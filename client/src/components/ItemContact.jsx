import React from "react";

export const ItemContact = ({tittle, subtittle, icon}) => {
    return (
        <div className="contact-item">
            <div className="icon">
                <img src={icon} alt="icon" />
            </div>
            <div className="contact-info">
                <h1>{tittle} </h1>
                {typeof subtittle === 'object' ? Object.values( subtittle).map((element, index) => <h2 key={index}>{element} </h2>
                ) : <h2>{ subtittle }</h2>}
            </div>
        </div>
    );
};
