import React, { useState } from 'react';
import { deleteProject } from '../../helpers/deleteProject';
import { updateProject } from '../../helpers/updateProject';

export const Project = ({ project, number, user, token, loadData }) => {
    const [imgHover, setImgHover] = useState(false);
    const [nameFile, setNameFile] = useState('');
    const [stateProject, setStateProject] = useState(project);
    const handleMouseOverImg = () => {
        setImgHover(!imgHover);
    };
    const handleInputFile = (e) => {
        setNameFile(e.target.value.split('\\').pop());
    };
    const handleOnchange = (e) => {
        setStateProject({ ...stateProject, [e.target.name]: e.target.value });
    };

    const handleDelete = () => {
        deleteProject(user, token, number);
        loadData(user, token);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputsText = [...e.target].filter(
            (element) =>
                element.name !== '' &&
                element.value !== '' &&
                element.type !== 'file'
        );

        const inputFile = e.target[0].files[0];

        const project = [inputsText[0], inputsText[1], inputsText[2]];

        updateProject(user, token, inputFile, project, number);

        // loadData(user, token);
    };

    return (
        <>
            <form
                action=""
                onSubmit={handleSubmit}
                className="d-flex justify-content-end col-md-10 mb-4"
            >
                <div className="row ">
                    <div className="row px-4">
                        <label
                            className="label-title-image"
                            htmlFor="choose_file"
                        >
                            Imagen del Proyecto
                        </label>
                        <label className="label-name-image col-6">
                            <span id="file_name">{nameFile}</span>
                        </label>
                        <div
                            className="container-image col-4 w-25"
                            onMouseOver={handleMouseOverImg}
                            onMouseOut={handleMouseOverImg}
                        >
                            <img
                                htmlFor="choose_file"
                                src={
                                    imgHover
                                        ? '/img/subir_hover.png'
                                        : '/img/subir.png'
                                }
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
                    <div className="titulo col-12 col-sm-5  align-content-center justify-content-center pt-5">
                        <label htmlFor="title" style={{ paddingLeft: '7px' }}>
                            Nombre del Proyecto
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={stateProject?.title}
                            onChange={handleOnchange}
                        />
                    </div>
                    <div className="row px-4">
                        <div className="titulo col-12 col-sm-5  align-content-center justify-content-center pt-5 ps-0">
                            <label
                                htmlFor="subtitle"
                                style={{ paddingLeft: '7px' }}
                            >
                                Slogan del Proyecto
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={stateProject?.subtitle}
                                onChange={handleOnchange}
                            />
                        </div>
                        <div id="div-textarea" className="titulo  col-sm-5">
                            <label htmlFor="description">
                                Descripcion del Proyecto
                            </label>
                            <textarea
                                type="text"
                                name="description"
                                rows="10"
                                value={stateProject?.description}
                                onChange={handleOnchange}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn-upload col-sm-4 text-center"
                        onClick={handleDelete}
                    >
                        Eiminar Proyecto
                    </button>
                    <button
                        type="submit"
                        className="btn-upload col-sm-4 text-center"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </>
    );
};
