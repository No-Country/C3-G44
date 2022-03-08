import React from 'react';
import './Projects.css';
import logo from '../../assets/img/logo_coder.png';
import { useState } from 'react';

export const Projects = () => {
    const [imgHover, setImgHover] = useState(false);
    const handleMouseOverImg = () => {
      setImgHover(!imgHover);
      console.log('hover');
    };
    const handleInputFile = () => {};
  const handleOnchange = () => { };
  
  const handleAddProject = () => {
    
  }

    const handleSubmit = () => {};

    return (
        <div id="projects" className="container row d-flex align-items-center">
            <div className="row ms-5">
                <div className="d-flex justify-content-end col-md-10">
                    <img src={logo} alt="Logo Coder" className="col-md-2" />
                </div>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="d-flex justify-content-end col-md-10"
                >
                    <div className="row ">
                        <>
                            <div className="row px-4">
                                <label
                                    className="label-title-image"
                                    htmlFor="choose_file"
                                >
                                    Imagen del Proyecto
                                </label>
                                <label className="label-name-image col-6">
                                    <span id="file_name">{'name'}</span>
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
                                        onMouseOver={handleMouseOverImg}
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
                                <label
                                    htmlFor="profesion"
                                    style={{ paddingLeft: '7px' }}
                                >
                                    Nombre del Proyecto
                                </label>
                                <input
                                    type="text"
                                    name="profesion"
                                    value={'aboutme?.profesion'}
                                    onChange={handleOnchange}
                                />
                            </div>
                        </>
                        <div className="row px-4">
                            <div className="titulo col-12 col-sm-5  align-content-center justify-content-center pt-5 ps-0">
                                <label
                                    htmlFor="profesion"
                                    style={{ paddingLeft: '7px' }}
                                >
                                    Slogan del Proyecto
                                </label>
                                <input
                                    type="text"
                                    name="profesion"
                                    value={'aboutme?.profesion'}
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
                                    value={'aboutme?.description'}
                                    onChange={handleOnchange}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn-upload col-sm-4 text-center"
                        >
                            Agregar otro proyecto
                        </button>
                        <button
                            type="submit"
                            className="btn-upload col-sm-4 text-center"
                        >
                            <div className="container-button-img">
                                <img src="/img/save.png" alt="save" />
                            </div>
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
