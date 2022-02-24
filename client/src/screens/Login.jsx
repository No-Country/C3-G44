import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

import Axios from 'axios'
import { UserContext } from '../context/UserContext';
import { UserTypes } from '../types/UserTypes';
/* import {eyeClose} from '../../public/img/eyeClose.png' */

export const Login = () => {
    const navigate = useNavigate();
    const {dispatchUser} = useContext(UserContext)

    const handleLogin = (e) => {
        e.preventDefault();
        const data = { email: e.target[0].value, password: e.target[1].value }
        carga(data);
    };

    const carga = async (data) => {
        await Axios.post('/user/login', data)
            .then((respuesta) => {
                if (respuesta.data.auth) {
                    dispatchUser({ type: UserTypes.load, payload: respuesta.data })
                    console.log(respuesta.data);
                    navigate('/porfolio');
                } else {
                    alert(respuesta.data.mensaje);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
       /*  <div className='row'> */
            <div id="container-form" className="align-self-center col-sm-10 col-md-6 m-auto  py-3 my-auto">
                <form id="about" action="" onSubmit={handleLogin}>
                <div className='row m-auto'>
                <h1 className="section-title col-sm-10 col-md-10 mx-auto" >
                        Ingresa tus datos de acceso
                    </h1>
                    <label htmlFor="email" className='px-3 col-sm-10 col-md-10 mx-auto' >
                        Usuario
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="cta px-3 col-md-10 mx-auto col-sm-10"
                        
                    />
                    <label htmlFor="password" className='px-3 col-sm-10 col-md-10  mx-auto ' >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        /* img src={"eyeClose.png"}  */
                        className="cta px-3 col-sm-10 col-md-10 mx-auto"
                    />
                    <button
                        className="cta btnlogin col-md-6 mx-auto"
                        type="submit"
                    >
                        Iniciar sesión
                    </button>
                    </div>
                </form>
            </div>
       /*  </div> */
    );
};
