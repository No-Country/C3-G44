import React, { useContext, useEffect, useState } from "react";
import "./About.css";

import { UserContext } from "../../context/UserContext";
import { loadDataUser } from "../../helpers/loadDataUser";
import { updateUser } from "../../helpers/updateUser";

export const About = () => {
    const [aboutme, setAboutme] = useState({ profesion: "", description: "" });
    const { stateUser } = useContext(UserContext);
    const { user } = stateUser;
    const { data } = stateUser;
    const { token } = data;

    const [name, setName] = useState("");
    const [nameCV, setNameCV] = useState("");

    const handleInputFile = (e) => {
        setName(e.target.value.split("\\").pop());
    };

    const handleInputFileCV = (e) => {
        setNameCV(e.target.value.split("\\").pop());
    };

    const handleOnchange = (e) => {
        console.log(e.target.value);
        setAboutme({ ...aboutme, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const avatar = e.target[0].files[0];

        const data = {
            aboutme: {
                profesion: e.target[1].value,
                description: e.target[2].value,
            },
        };
        const cv = e.target[3].files[0];

        updateUser(user, token, avatar, null, data, cv);
    };

    useEffect(() => {
        const loadData = async (_id, tokens) => {
            const dataResponse = await loadDataUser(_id, tokens);
            const { user } = dataResponse;
            setAboutme({ ...user.aboutme });
        };
        loadData(user, token);
    }, [user, token]);

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
                        <label
                            htmlFor="profesion"
                            style={{ paddingLeft: "7px" }}
                        >
                            Profesion
                        </label>
                        <input
                            type="text"
                            name="profesion"
                            value={aboutme?.profesion}
                            onChange={handleOnchange}
                        />
                    </div>
                    <div className="titulo col- 12 col-sm-7">
                        <label htmlFor="description">
                            Descripcion de Profesion
                        </label>
                        <textarea
                            type="text"
                            name="description"
                            rows="5"
                            value={aboutme?.description}
                            onChange={handleOnchange}
                        />
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
                                <img src="/img/subir.png" alt="save" />
                            </div>
                            Subir
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
