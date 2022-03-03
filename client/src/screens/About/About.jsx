import React from "react";
import { useState } from "react";
import "./About.css";

export const About = () => {
  const [name, setName] = useState("");
  const handleInputFile = (e) => {
    console.log(e.target.value.split("\\").pop());
    setName(e.target.value.split("\\").pop());
  };

  return (
    <div
      id="about-home"
      className="container align-self-center col-sm-10 col-md-6 m-auto  py-3 my-auto"
    >
      <form action="">
        <div className="row">
          <div className="row px-3">
            <label htmlFor="choose_file" style={{ display: "flex", fontSize: '15px', marginTop: '10px', marginBottom: '-30px'}}>Imagen Personal</label>
            <input
              type="file"
              accept="image/*"
              name="choose_file"
              id="choose_file"
              className="inputfile custom"
              onChange={handleInputFile}
            />
            <label htmlFor="choose_file" className="col-6">
              <span id="file_name">{name}</span>
            </label>
            <div
              className="container-image col-4 w-25"
              onClick={() => console.log("imagen")}
            >
              <img src="/img/save.png" alt="save" />
            </div>
          </div>

          <div className="titulo col- 12 col-sm-5  align-content-center justify-content-center pt-5">
            <label htmlFor="titulo">Profesion</label>
            <input type="text" name="titulo" />
          </div>
          <div className="titulo col- 12 col-sm-7">
            <label htmlFor="textarea">Descripcion de Profesion</label>
            <textarea type="text" name="textarea" rows="5" />
            <button type="button" className="cta btnlogin col-md-6 mx-auto"> Subir</button>
          </div>
          
          <div className="row px-3">
            <label htmlFor="choose_cv" style={{ display: "flex", fontSize: '15px', marginTop: '10px', marginBottom: '-30px'}}>Link CV/Resume</label>
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
              onClick={() => console.log("imagen")}
            >
              <img src="/img/save.png" alt="save" />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
