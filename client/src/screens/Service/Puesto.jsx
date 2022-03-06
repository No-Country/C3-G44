import React, { useState } from 'react'

export const Puesto = ({ service }) => {
    console.log({...service});
    const [job, setJob] = useState({ ...service })

    const handleChange = (e) => {

    }
    
  return (
      <div className="col-md-10 row mt-5">
          <div className="col-12 mb-5 d-flex flex-column">
              <label htmlFor="" className="big-lavel b">
                  Puesto
              </label>
              <input
                  type="text"
                  name="title"
                  className="low-black-border col-md-10 mt-4"
                  value={job.title}
                  onChange={handleChange}
              />
          </div>
          <div className="col-12 mb-5 d-flex flex-column">
              <label htmlFor="" className="big-lavel b">
                  Nombre de la empresa
              </label>
              <input
                  type="text"
                  name=""
                  className="low-black-border col-md-10 mt-4"
              />
          </div>
          <div className="row mb-5">
              <label htmlFor="" className="big-lavel b">
                  Tiempo en el cargo
              </label>
              <div className="col-md-4 mt-4">
                  <label htmlFor="" className="small-lavel">
                      Desde
                  </label>
                  <input type="date" name="" className="mx-5" />
              </div>
              <div className="col-md-4 mt-4">
                  <label htmlFor="" className="small-lavel">
                      Hasta
                  </label>
                  <input type="date" name="" className="mx-5" />
              </div>
          </div>
          <div className="col-12 mb-5 d-flex flex-column">
              <label htmlFor="" className="big-lavel b">
                  Descripción del puesto
              </label>
              <textarea
                  type="text"
                  name="description"
                  placeholder="En este espacio podés hacer una descripción general de tu experiencia laboral"
                  className="description-input col-md-12 mt-4"
                  value={job.description}
                  onChange={handleChange}
              />
          </div>
          {/* <div className="row mb-5">
              <h3 className="col-md-4 mt-3">¿Querés agregar una imagen?</h3>
              <input type="file" name="" className="col-md-6 mt-3" />
          </div> */}
      </div>
  );
}
