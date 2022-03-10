import React, { useContext, useEffect, useState } from "react";
import "./About.css";

import { UserContext } from "../../context/UserContext";
import { loadDataUser } from "../../helpers/loadDataUser";
import { updateUser } from "../../helpers/updateUser";
import logo from '../../assets/img/logo_coder.png';


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
            className="container row d-flex align-items-center "
        >
            <div className="row ms-5 col-md-12 m-auto">
                <div className="d-flex justify-content-end">
                    <img src={logo} alt="Logo Coder" className="col-md-2" />
                </div>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="d-flex justify-content-end"
                >
                    <div className="row">
                         {/* Primera fila: Img personal e ícono */}
                        <div className="row px-4 mt-3 ">
                           <div className="col-md-4 mt-2">
                           <label
                                className="label-title-image mt-2"
                                htmlFor="choose_file"
                            >
                                Imagen Personal
                            </label>
                            <label className="label-name-image col-6">
                                <span id="file_name">{name}</span>
                            </label>
                           </div>
                            <div className="container-image col-4 w-25 mt-2">
                                <img
                                    htmlFor="choose_file"
                                    src="/img/subir.png"
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
                        {/* Segunda fila: profesion + descripción de profesion */}
                      <div className="row mt-2">
                        <div className="titulo col-md-6 col-sm-12  align-content-center justify-content-between pt-5 mt-2">
                                <label
                                    htmlFor="profesion"
                                    style={{ paddingLeft: '7px' }}
                                    className="mt-2 mb-3"
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
                            <div className="titulo col- 12 col-sm-12 col-md-6 mt-2">
                                <label htmlFor="description mb-3 mt-3">
                                    Describe tu Profesion
                                </label>
                                <textarea
                                    type="text"
                                    name="description"
                                    rows="5"
                                    value={aboutme?.description}
                                    onChange={handleOnchange}
                                />
                        </div>
                      </div>
                       
                        {/* tercer fila: subir cv + boton guardar */}
                        <div className="row px-4 mt-2">
                          <div className="col-md-6 d-flex flex-row"> 
                            <div className="col-md-8 mt-2 col-sm-12">
                                    <label
                                        className="label-cv-name "
                                        htmlFor="choose_cv"
                                    >
                                        Sube aquí tu CV
                                    </label>
                                    <label className="label-cv col-4">
                                        <span id="file_name_cv">{nameCV}</span>
                                    </label>
                                </div>
                            <div className="container-image col-sm-12 w-25 mr-5">
                                <img
                                    htmlFor="choose_cv"
                                    src="/img/subir.png"
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
                            </div>
                            <button
                                type="submit"
                                className="btn-upload col-sm-4 text-center"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
