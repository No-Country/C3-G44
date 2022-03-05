import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { loadDataUser } from "../../helpers/loadDataUser";
import { updateUser } from "../../helpers/updateUser";
import "./Origin.css";

export const Origin = () => {
    const { stateUser } = useContext(UserContext);
    const { user } = stateUser;
    const { data } = stateUser;
    const { token } = data;

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
        <div
            id="origin"
            className='className="container align-self-center col-sm-10 col-md-6 m-auto  py-3 my-auto"'
        >
            <form action="" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="titulo col-12 align-content-center justify-content-center pt-5">
                        <label
                            htmlFor="nombreCompleto"
                            style={{ paddingLeft: "7px" }}
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
                        <label htmlFor="email" style={{ paddingLeft: "7px" }}>
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
                            style={{ paddingLeft: "7px" }}
                        >
                            Password
                        </label>
                        <input
                            type="text"
                            name="password"
                            onChange={handleOnChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-upload col-sm-6 text-center"
                    >
                        <div className="container-button-img">
                            <img src="/img/save.png" alt="save" />
                        </div>
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};
