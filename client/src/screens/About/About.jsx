import React, { useContext, useState } from 'react';
import './About.css';

import Axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { loadDataUser } from '../../helpers/loadDataUser';

export const About = () => {


    const { stateUser, dispatchUser } = useContext(UserContext);
    const { user } = stateUser;
    const { data } = stateUser;
    const { token } = data;
    
    const loadData = async (_id, token) => {
        const dataResponse = await loadDataUser(_id, token);
        const { data, user } = dataResponse;
        
        console.table(user);
        
    };

    loadData(user, token)

    const [name, setName] = useState('');
    const [nameCV, setNameCV] = useState('');

    const handleInputFile = (e) => {
        setName(e.target.value.split('\\').pop());
    };

    const handleInputFileCV = (e) => {
        setNameCV(e.target.value.split('\\').pop());
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

        console.log(
            e.target[0].value,
            e.target[1].value,
            e.target[2].value
            // e.target[3].value
        );

        carga(avatar, null, data, cv);
    };

    const carga = async (avatar = null, images = null, data = null, cv = null) => {
        const img = new FormData();
        img.append('avatar', avatar);
        images && images.map((file) => img.append('images', file));
        img.append('cv', cv);
        await Axios.put(`/admin/updatedatauser/${user}`, data, {
            headers: {
                Authorization: `Baered ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data.mensaje);
            })
            .catch((err) => {
                console.log(err);
            });

        await Axios.put(`/admin/updateuser/${user}`, img, {
            headers: {
                Authorization: `Baered ${token}`,
            },
        })
            .then((respuesta) => {
                console.log(respuesta.data.mensaje);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                        <label htmlFor="titulo" style={{ paddingLeft: '7px' }}>
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
