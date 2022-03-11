import React, { useState } from 'react'

export const Direccion = ({ number, value }) => {
    
    const [direccion, setDireccion] = useState(value)

    const handleOnChange = (e) => {
        setDireccion(e.target.value);
        
    }

  return (
      <>
          <label htmlFor="" className="big-lavel b">
              Dirección
          </label>
          <input type="text" name={`direccion${number}`}  className="col-12 mt-4" value={direccion} onChange={handleOnChange}/>
      </>
  );
}
