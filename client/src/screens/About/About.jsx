import React from 'react';
import { useState } from 'react';
import './About.css';

export const About = () => {
    const [name, setName] = useState('');
    const handleInputFile = (e) => {
        console.log(e.target.value.split('\\').pop());
        setName(e.target.value.split('\\').pop());
    };

    return (
        <div id="about" className="container">
            <form action="">
                <div className="row">
                    <div className="container-input-file row px-3">
                        <input
                            type="file"
                            name="choose_file"
                            id="choose_file"
                            className="inputfile custom"
                            onChange={handleInputFile}
                        />
                        <label
                            htmlFor="choose_file"
                            className="col-sm-6"
                            style={{ borderBottom: '5px solid', marginRight: '5px'}}
                        >
                            <span id="file_name">{name}</span>
                        </label>
                        <div
                            className="col-sm-4 w-25"
                            style={{
                                maxWidth: '53px',
                                maxHeight: '54px',
                                padding: '0px',
                            }}
                            onClick={() => console.log('imagen')}
                        >
                            <img src="/img/save.png" alt="" style={{}} />
                        </div>
                        {/* <div className="line_file" /> */}
                    </div>

                    <div className="titulo col- 12 col-sm-5  align-content-center justify-content-center pt-5">
                        <label htmlFor="titulo">Profesion</label>
                        <input type="text" name="titulo" />
                    </div>
                    <div className="titulo col- 12 col-sm-7">
                        <label htmlFor="textarea">Profesion</label>
                        <textarea type="text" name="textarea" rows="5" />
                    </div>
                </div>
            </form>
        </div>
    );
};
