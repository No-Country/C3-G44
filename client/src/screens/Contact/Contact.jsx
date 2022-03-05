import React from 'react'
import './Contact.css'
import logo from "../../assets/img/logo_coder.png"

export const Contact = () => {
  return (
    <div id="contact" className="container row p-5 d-flex align-items-center m-auto" >
      <div  className="d-flex justify-content-end col-md-10">
        <img src={logo} id="logo" alt="Logo Coder" className='col-md-2'/>
      </div>
      <div className='col-md-10'>
        <div className='col-md-12 mx-auto'>
         <label htmlFor="" className='big-lavel b'>Dirección</label> 
          <input
              type="text"
              name="dirección"
              className="col-12 mt-4"
          />
          <button className='button-transparent my-5 px-4 py-3'>Agregar otra dirección</button>
        </div>
        <div className='col-md-12 mx-auto row d-flex justify-content-between'>
          <div className='col-md-5 mt-2 mb-3'>
          <label htmlFor="" className='big-lavel b'>Teléfono</label>
            <input
              type="number"
              name="number"
              className=" col-12 mt-4"
            />
            <button className='button-transparent mt-5 px-4 py-3 mb-3'>Agregar otro teléfono</button>
          </div>
          <div className='col-md-5 mt-2 mb-3'>
          <label htmlFor="" className='big-lavel b'>Mail</label>
            <input
                type="mail"
                name="mail"
                className="col-12 mt-4"
          />
            <button className='button-transparent mt-5 px-4 py-3 mb-2'>Agregar otro mail</button>        
          </div>
        </div>
        <div className='mx-auto mt-5 col-md-12 d-flex justify-content-center '>
          <button type='submit' className='button-orange px-5 py-3'>Guardar</button>
        </div>
      </div>
    </div>
  )
}
