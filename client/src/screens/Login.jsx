import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

import Axios from 'axios'
import { UserContext } from '../context/UserContext';
import { UserTypes } from '../types/UserTypes';

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
        <div className="container">
            <form id="about" action="" onSubmit={handleLogin}>
                <h1 className="section-title" >
                    Login Screen
                </h1>
                <label htmlFor="email" >
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    className="cta"
                    
                />
                <label htmlFor="password" >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    className="cta"
                />
                <button
                    className="cta btnlogin"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};
