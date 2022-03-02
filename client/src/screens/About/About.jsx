import React from "react";
import { useState } from "react";
import "./About.css";

export const About = () => {

  const [name, setName] = useState('')
  const handleInputFile = (e) => {
    console.log(e.target.value.split('\\').pop());
    setName(e.target.value.split("\\").pop());
}

    return (
        <div id="about" className="container">
            <form action="">
                <div className="container-input-file">
                    <input
                        type="file"
                        name="choose_file"
                        id="choose_file"
              className="inputfile custom"
              onChange={handleInputFile}
                    />
                    <label htmlFor="choose_file">
              <span id="file_name">{ name }</span>
                        <strong>Choose a file</strong>
            </label>
            <div style={{marginTop: '10px', borderTop: '5px solid #000000', borderRadius: '5px', width: '80%'}}/>
                </div>
            </form>
        </div>
    );
};
