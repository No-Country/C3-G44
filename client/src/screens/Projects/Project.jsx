import React, { useState } from 'react';

export const Project = ({ project }) => {
    
    const [imgHover, setImgHover] = useState(false);
    const [nameFile, setNameFile] = useState('')
    const [stateProject, setStateProject ] = useState(project)
    const handleMouseOverImg = () => {
        setImgHover(!imgHover);
    };
    const handleInputFile = (e) => {
        setNameFile(e.target.value.split('\\').pop());
    };
    const handleOnchange = (e) => {
        console.log({ ...stateProject, [e.target.name]: e.target.value });
        setStateProject({...stateProject, [e.target.name]: e.target.value});
    };
    return (
        <>
            <div className="row px-4">
                <label className="label-title-image" htmlFor="choose_file">
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
                            imgHover ? '/img/subir_hover.png' : '/img/subir.png'
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
                    <label htmlFor="subtitle" style={{ paddingLeft: '7px' }}>
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
        </>
    );
};
