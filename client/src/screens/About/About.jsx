import React, { useState } from 'react';
import './About.css';

export const About = () => {
    const [name, setName] = useState('');
    const [nameCV, setNameCV] = useState('');
    const handleInputFile = (e) => {
        console.log(e.target.value.split('\\').pop());
        setName(e.target.value.split('\\').pop());
    };
    const handleInputFileCV = (e) => {
        setNameCV(e.target.value.split('\\').pop());
    };

    return (
        <div
            id="about-home"
            className="container align-self-center col-sm-10 col-md-6 m-auto  py-3 my-auto"
        >
            <form action="">
                <div className="row">
                    <div className="row px-4">
                        <label
                            htmlFor="choose_file"
                            style={{
                                display: 'flex',
                                fontSize: '15px',
                                marginTop: '10px',
                                marginBottom: '-30px',
                            }}
                        >
                            Imagen Personal
                        </label>
                        <label
                            className="col-6"
                            style={{
                                borderBottom: '5px #000000 solid',
                                paddingTop: '28px',
                            }}
                        >
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
                        <label htmlFor="titulo">Profesion</label>
                        <input type="text" name="titulo" />
                    </div>
                    <div className="titulo col- 12 col-sm-7">
                        <label htmlFor="textarea">
                            Descripcion de Profesion
                        </label>
                        <textarea type="text" name="textarea" rows="5" />
                    </div>

                    <div className="row px-4">
                        <label
                            htmlFor="choose_cv"
                            style={{
                                display: 'flex',
                                fontSize: '15px',
                                marginTop: '10px',
                                marginBottom: '-30px',
                            }}
                        >
                            Link CV/Resume
                        </label>
                        <label
                            className="label-cv col-4"
                            style={{
                                borderBottom: '5px #000000 solid',
                                paddingTop: '28px', 
                            }}
                        >
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
                        <button type="button" className="btn-upload col-sm-4 text-center">
                            <div style={{width:'15px', height:'15px', margin: 'auto'}}>
                                <img src="/img/save.png" alt="save"  />
                            </div>
                            Subir
                        </button>
                    </div>

                    {/* <div className="row">
                        <button
                            type="button"
                            className="cta btnlogin col-md-6 mx-auto"
                        >
                            Subir
                        </button>
                    </div> */}

                    {/* <div className="row px-3">
                        <label
                            htmlFor="choose_cv"
                            style={{
                                display: 'flex',
                                fontSize: '15px',
                                marginTop: '10px',
                                marginBottom: '-30px',
                            }}
                        >
                            Link CV/Resume
                        </label>
                        <input
                            type="file"
                            accept=""
                            name="choose_cv"
                            id="choose_file"
                            className="inputfile custom"
                            onChange={handleInputFile}
                        />
                        <label htmlFor="choose_cv" className="col-4">
                            <span id="file_name">{name}</span>
                        </label>
                        <div
                            className="container-image col-4 w-25"
                            onClick={() => console.log('imagen')}
                        >
                            <img src="/img/save.png" alt="save" />
                        </div>
                    </div> */}
                </div>
            </form>
        </div>
    );
};
