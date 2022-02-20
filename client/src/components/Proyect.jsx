import React from "react";

export const Proyect = ({ tittle, subtittle, text, img }) => {
    return (
        <div className="project-item">
            <div className="project-info">
                <h1>{tittle}</h1>
                <h2>{subtittle} </h2>
                <p>{text}</p>
            </div>
            <div className="project-img">
                <img src={img} alt="img" />
            </div>
        </div>
    );
};
