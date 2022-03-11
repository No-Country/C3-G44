import React, { useState } from 'react';

export const Puesto = ({ service, number, handleDeletePuesto }) => {
    const [job, setJob] = useState({ ...service });

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    return (
        <div className="col-md-10 row mt-5">
            <div className="col-12 mb-5 d-flex flex-column">
                <label htmlFor="" className="big-lavel b">
                    Puesto
                </label>
                <input
                    type="text"
                    name="title"
                    className="low-black-border col-md-10 mt-4"
                    value={job?.title}
                    onChange={handleChange}
                />
            </div>
            <div className="col-12 mb-5 d-flex flex-column">
                <label htmlFor="" className="big-lavel b">
                    Nombre de la empresa
                </label>
                <input
                    type="text"
                    name="subtitle"
                    className="low-black-border col-md-10 mt-4"
                    value={job?.subtitle}
                    onChange={handleChange}
                />
            </div>
            <div className="row mb-5">
                <label htmlFor="" className="big-lavel b">
                    Tiempo en el cargo
                </label>
                <div className="col-md-4 mt-4">
                    <label htmlFor="" className="small-lavel">
                        Desde
                    </label>
                    <input
                        type="date"
                        name="dateinit"
                        className="mx-5"
                        value={job?.dateinit}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4 mt-4">
                    <label htmlFor="" className="small-lavel">
                        Hasta
                    </label>
                    <input
                        type="date"
                        name="datefinish"
                        className="mx-5"
                        value={job?.datefinish}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="col-12 mb-5 d-flex flex-column">
                <label htmlFor="" className="big-lavel b">
                    Descripción del puesto
                </label>
                <textarea
                    type="text"
                    name="description"
                    placeholder="En este espacio podés hacer una descripción general de tu experiencia laboral"
                    className="description-input col-md-12 mt-4"
                    value={job.description}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-10 d-flex mb-5">
                <button
                    className="button-transparent px-4 py-3"
                    type="button"
                    onClick={ () => handleDeletePuesto(number)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};
