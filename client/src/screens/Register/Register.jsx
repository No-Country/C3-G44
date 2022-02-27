import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

export const Register = () => {
    return (
        <div
            id="container-register"
            className="align-self-center col-sm-10 col-md-6 m-auto  py-3 my-auto"
        >
            <form id="about" action="" onSubmit={() => ''}>
                <div className="row m-auto">
                    <h1 className="section-title col-sm-10 col-md-10 mx-auto">
                        Crea una cuenta
                    </h1>
                    <label
                        htmlFor="name"
                        className="px-3 col-sm-10 col-md-10 mx-auto"
                    >
                        Nombre y Apellidos
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="cta px-3 col-md-10 mx-auto col-sm-10"
                    />
                    <label
                        htmlFor="email"
                        className="px-3 col-sm-10 col-md-10 mx-auto"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="cta px-3 col-md-10 mx-auto col-sm-10"
                    />
                    <label
                        htmlFor="password"
                        className="px-3 col-sm-10 col-md-10  mx-auto "
                    >
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
                        Registrarse
                    </button>
                    <label >
                        Ya tienes cuenta?{' '}
                        <Link to="/login">
                            Login
                        </Link>
                    </label>
                </div>
            </form>
        </div>
    );
};
