import React, { useState } from 'react';

export const Project = () => {
    const [imgHover, setImgHover] = useState(false);
    const handleMouseOverImg = () => {
        setImgHover(!imgHover);
        console.log('hover');
    };
    const handleInputFile = () => {};
    const handleOnchange = () => {};
    return (
        <>
            <div className="row px-4">
                <label className="label-title-image" htmlFor="choose_file">
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
                            imgHover ? '/img/subir_hover.png' : '/img/subir.png'
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
                <label htmlFor="profesion" style={{ paddingLeft: '7px' }}>
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
    );
};
