import React, { useState } from "react";
import "./About.css";

export const About = () => {
    const [name, setName] = useState("");
    const [nameCV, setNameCV] = useState("");
    const handleInputFile = (e) => {
        setName(e.target.value.split("\\").pop());
    };
    const handleInputFileCV = (e) => {
        setNameCV(e.target.value.split("\\").pop());
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(
            e.target[0].value,
            e.target[1].value,
            e.target[2].value,
            e.target[3].value
        );
    }
    return (
        <div
            id="about-home"
            className="container align-self-center col-sm-10 col-md-6 m-auto  py-3 my-auto"
        >
            <form action="" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="row px-4">
                        <label
                            className="label-title-image"
                            htmlFor="choose_file"
                        >
                            Imagen Personal
                        </label>
                        <label className="label-name-image col-6">
                            <span id="file_name">{name}</span>
                        </label>
                        <div className="container-image col-4 w-25">
                            <img
                                htmlFor="choose_file"
                                src="/img/save.png"
                                alt="save"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                name="choose_file"
                                id="choose_file"
                                className="inputfile custom"
                                onChange={handleInputFile}
                            />
                        </div>
                    </div>

                    <div className="titulo col- 12 col-sm-5  align-content-center justify-content-center pt-5">
                        <label htmlFor="titulo" style={{ paddingLeft: "7px" }}>
                            Profesion
                        </label>
                        <input type="text" name="titulo" />
                    </div>
                    <div className="titulo col- 12 col-sm-7">
                        <label htmlFor="textarea">
                            Descripcion de Profesion
                        </label>
                        <textarea type="text" name="textarea" rows="5" />
                    </div>

                    <div className="row px-4">
                        <label className="label-cv-name" htmlFor="choose_cv">
                            Link CV/Resume
                        </label>
                        <label className="label-cv col-4">
                            <span id="file_name_cv">{nameCV}</span>
                        </label>
                        <div className="container-image col-4 w-25">
                            <img
                                htmlFor="choose_cv"
                                src="/img/save.png"
                                alt="save"
                            />
                            <input
                                type="file"
                                accept=".pdf"
                                name="choose_cv"
                                id="choose_file"
                                className="inputfile custom"
                                onChange={handleInputFileCV}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-upload col-sm-4 text-center"
                        >
                            <div className="container-button-img">
                                <img src="/img/save.png" alt="save" />
                            </div>
                            Subir
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
