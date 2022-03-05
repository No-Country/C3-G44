import React, { useState } from 'react'

export const Telefono = ({number, value}) => {
    const [telefono, setTelefono] = useState(value)

    const handleOnchange = (e) => {
        setTelefono(e.target.value)
    }

  return (
      <>
          <label htmlFor="" className="big-lavel b">
              Teléfono
          </label>
          <input type="number" name={`telefono${number}`} className=" col-12 mt-4" value={telefono} onChange={handleOnchange} />
      </>
  );
}
