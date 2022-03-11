import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { UserContext } from '../../context/UserContext';
import { registerUser } from '../../helpers/registerUser';

import './Register.css';
import { UserTypes } from '../../types/UserTypes';

export const Register = () => {
    const navigate = useNavigate();
    const { dispatchUser } = useContext(UserContext);
    const [eyed, setEyed] = useState(true);

    const handleEye = () => {
        setEyed(!eyed);
    };

    const registerUser = async (user) => {
        await Axios.post('/user/create', user)
            .then((respuesta) => {
                if (respuesta.data.data.auth) {
                    dispatchUser({
                        type: UserTypes.load,
                        payload: respuesta.data,
                    });
                    navigate(`/home`);
                } else {
                    alert(respuesta.data.data.mensaje);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        registerUser(e);
    };

    return (
        <div
            id="container-register"
            className="align-self-center col-sm-10 col-md-6 m-auto  py-3 my-auto"
        >
            <Formik
                initialValues={{
                    nombreCompleto: '',
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    nombreCompleto: Yup.string()
                        .min(2, 'Su nombre es muy corto')
                        .required('Por favor ingrese su nombre y apellidos'),
                    email: Yup.string()
                        .email('Debe ser un email valido')
                        .required('Por favor ingrese su email'),
                    password: Yup.string()
                        .min(8, 'Contraseña muy corta')
                        .max(20, 'Contraseña muy larga')
                        .required('Por favor ingrese una contraseña'),
                })}
                onSubmit={(values, { setValues }) => {
                    handleSubmit(values);
                    setValues({
                        nombreCompleto: '',
                        email: '',
                        password: '',
                    });
                }}
            >
                {({ errors, touched, handleSubmit, valid, setValues }) => {
                    return (
                        <Form
                            id="form-register"
                            action=""
                            onSubmit={(values) =>
                                handleSubmit(values, setValues)
                            }
                        >
                            <div className="row m-auto">
                                <h1 className="section-title col-sm-10 col-md-10 mx-auto">
                                    Crea una cuenta
                                </h1>
                                <label
                                    htmlFor="nombreCompleto"
                                    className="px-3 col-sm-10 col-md-10 mx-auto"
                                >
                                    Nombre y Apellidos
                                </label>
                                <Field
                                    type="text"
                                    name="nombreCompleto"
                                    className="cta px-3 col-md-10 mx-auto col-sm-10"
                                />
                                {errors.nombreCompleto &&
                                    touched.nombreCompleto && (
                                        <p className="px-3 col-sm-10 col-md-10 mx-auto">
                                            {errors.nombreCompleto}
                                        </p>
                                    )}
                                <label
                                    htmlFor="email"
                                    className="px-3 col-sm-10 col-md-10 mx-auto"
                                >
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="cta px-3 col-md-10 mx-auto col-sm-10"
                                />
                                <ErrorMessage name="email">
                                    {(msg) => (
                                        <p className="px-3 col-sm-10 col-md-10 mx-auto">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>

                                <label
                                    htmlFor="password"
                                    id="labelPassword"
                                    className="px-3 col-7 col-sm-7 col-md-7  mx-auto me-1"
                                >
                                    Contraseña
                                </label>
                                <img
                                    className="px-3 col-3 col-sm-3 col-md-3 mt-3 mx-auto "
                                    aria-hidden="true"
                                    src={
                                        eyed
                                            ? '/img/eyeClose.png'
                                            : '/img/eyeOpen.png'
                                    }
                                    alt="eye"
                                    onClick={handleEye}
                                />
                                <Field
                                    type={eyed ? 'password' : 'text'}
                                    name="password"
                                    /* img src={"eyeClose.png"}  */
                                    className="cta  px-3 col-sm-10 col-md-10 mx-auto"
                                />

                                {errors.password && touched.password && (
                                    <p className="px-3 col-sm-10 col-md-10 mx-auto">
                                        {errors.password}
                                    </p>
                                )}
                                <button
                                    className="cta btnlogin col-md-6 mx-auto"
                                    type="submit"
                                    disabled={valid}
                                >
                                    Registrarse
                                </button>
                                <label className="px-3 col-sm-10 col-md-10 mt-3 m-auto text-center">
                                    Ya tienes cuenta?{' '}
                                    <Link to="/login">Login</Link>
                                </label>
                                <div className="col-sm-10 col-md-10 mt-3  m-auto text-center">
                                    <img
                                        className="logo mb-3"
                                        src="/img/logo_coder.png"
                                        alt="logo"
                                    />
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
