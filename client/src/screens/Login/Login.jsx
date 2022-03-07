import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import Axios from "axios";
import { UserContext } from "../../context/UserContext";
import { UserTypes } from "../../types/UserTypes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export const Login = () => {
    const navigate = useNavigate();
    const { dispatchUser } = useContext(UserContext);

     const [eyed, setEyed] = useState(true);

     const handleEye = () => {
         setEyed(!eyed);
     };

    const handleSubmit = (values) => {
        carga(values);
    };

    const carga = async (data) => {
        await Axios.post("/user/login", data)
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

    return (
        <div
            id="container-form"
            className="align-self-center col-sm-10 col-md-6 m-auto  py-3 my-auto"
        >
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Debe ser un email valido")
                        .required("Por favor ingrese su email"),
                    password: Yup.string()
                        .min(6, "Contraseña muy corta")
                        .max(20, "Contraseña muy larga")
                        .required("Por favor ingrese una contraseña"),
                })}
                onSubmit={(values, { setValues }) => {
                    handleSubmit(values);
                    setValues({
                        email: "",
                        password: "",
                    });
                }}
            >
                {({ errors, touched, handleSubmit, valid, setValues }) => {
                    return (
                        <Form
                            id="about"
                            action=""
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            <div className="row m-auto">
                                <h1 className="section-title col-sm-10 col-md-10 mx-auto">
                                    Ingresa tus datos de acceso
                                </h1>
                                <label
                                    htmlFor="email"
                                    className="px-3 col-sm-10 col-md-10 mx-auto"
                                >
                                    Usuario
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
                                            ? "/img/eyeClose.png"
                                            : "/img/eyeOpen.png"
                                    }
                                    alt="eye"
                                    onClick={handleEye}
                                />
                                <Field
                                    type={eyed ? "password" : "text"}
                                    name="password"
                                    className="cta px-3 col-sm-10 col-md-10 mx-auto"
                                />
                                {errors.password && touched.password && (
                                    <p className="px-3 col-sm-10 col-md-10 mx-auto">
                                        {errors.password}
                                    </p>
                                )}
                                <button
                                    className="cta btnlogin col-md-6 mx-auto"
                                    type="submit"
                                >
                                    Iniciar sesión
                                </button>
                                <label className="px-3 col-sm-10 col-md-10 mt-3 m-auto text-center">
                                    No tienes cuenta?{" "}
                                    <Link to="/register">Registro</Link>
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
