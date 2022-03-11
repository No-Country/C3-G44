import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { loadDataUser } from "../../helpers/loadDataUser";
import { updateUser } from "../../helpers/updateUser";
import { UrlClient } from "../../lib/Url";
import logo from '../../assets/img/logo_coder.png';
import "./Origin.css";

export const Origin = () => {
    const { stateUser } = useContext(UserContext);
    const { user } = stateUser;
    const { data } = stateUser;
    const { token } = data;

    const url = `${UrlClient}/porfolio/${user}`;

    const [dataUser, setDataUser] = useState({
        nombreCompleto: "",
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const info = {
            nombreCompleto: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
        };
        updateUser(user, token, null, null, info, null);
    };

    useEffect(() => {
        const loadData = async (_id, tokens) => {
            const dataResponse = await loadDataUser(_id, tokens);
            const { email, nombreCompleto } = dataResponse.user;
            setDataUser({ email, nombreCompleto });
        };
        loadData(user, token);
    }, [user, token]);

    return (
        <div id="origin" className="container row p-3">
            {/* <div className="d-flex justify-content-end col-md-10">
                <img src={logo} alt="Logo Coder" className="col-md-2" />
            </div> */}
                <div className="d-flex justify-content-end col-md-10 col-sm-12">
                    <img src={logo} alt="Logo Coder" className="col-md-2" />
                </div>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="row align-self-center col-sm-12 col-md-10 m-auto  py-3 my-auto"
                >
                    <div className="row">
                        <div className="titulo col-12 align-content-center justify-content-center pt-5">
                            <label
                                htmlFor="nombreCompleto"
                                className="mb-3"
                
                            >
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={dataUser?.nombreCompleto}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="titulo col-12 align-content-center justify-content-center pt-5">
                            <label
                                htmlFor="email"
                                className="mb-3"
                            >
                                Usuario
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={dataUser?.email}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="titulo col- 12 align-content-center justify-content-center pt-5">
                            <label
                                htmlFor="password"
                                className="mb-3"
                            >
                                Contraseña
                            </label>
                            <input
                                type="text"
                                name="password"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="titulo col-md-12 align-content-center justify-content-center pt-5">
                            <label  htmlFor="url">
                                Puedes ver tu portfolio aquí
                            </label>
                            <a id="url-portfolio" className="d-flex flex-wrap" href={url} target="_blank" rel="noreferrer">
                                {url}
                            </a>
                        </div>
                        <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn-upload col-sm-6 text-center"
                        >
                            
                            Guardar
                        </button>
                    </div>
                        </div>
                       
                </form>
            </div>
        
    );
};
