import React, { useState } from 'react'

export const Mail = ({ number, value }) => {
    const [mail, setMail] = useState(value)
    
    const handleOnChange = (e) => {
        setMail(e.target.value)
        
    }
  return (
      <>
          <label htmlFor="" className="big-lavel b">
              Mail
          </label>
          <input type="mail" name={`email${number}`} className="col-12 mt-4" value={mail} onChange={handleOnChange}/>
      </>
  );
}
