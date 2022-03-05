import React, { useContext, useEffect, useState } from "react";
import "./Contact.css";
import logo from "../../assets/img/logo_coder.png";
import { Direccion } from "./Direccion";
import { Telefono } from "./Telefono";
import { Mail } from "./Mail";
import { updateUser } from "../../helpers/updateUser";
import { UserContext } from "../../context/UserContext";
import { loadDataUser } from "../../helpers/loadDataUser";

export const Contact = () => {
    const { stateUser } = useContext(UserContext);
    const { user } = stateUser;
    const { data } = stateUser;
    const { token } = data;

    const [direccion, setDireccion] = useState({});
    const [telefono, setTelefono] = useState({});
    const [email, setMail] = useState({});
    const [reload, setReload] = useState(false);

    const handleAddDireccion = () => {
        const number = {};
        number[`direccion${Object.keys(direccion).length + 1}`] = "";
        setDireccion({ ...direccion, ...number });
    };

    const handleAddTelefono = () => {
        const number = {};
        number[`telefono${Object.keys(telefono).length + 1}`] = "";
        setTelefono({ ...telefono, ...number });
    };

    const handleAddMail = () => {
        const number = {};
        number[`email${Object.keys(email).length + 1}`] = "";
        setMail({ ...email, ...number });
    };

    const handleOnSubmit = (e) => {
      e.preventDefault();
        const contactinfo = {
            contactinfo: { direccion: {}, telefono: {}, email: {} },
        };

        [...e.target].forEach((element) => {
            if (element.name !== "" && element.value !== "") {
                if (element.name.includes("direccion")) {
                    if (element.value !== "") {
                        contactinfo.contactinfo.direccion[element.name] =
                            element.value;
                    }
                }
                if (element.name.includes("telefono")) {
                    if (element.value !== "") {
                        contactinfo.contactinfo.telefono[element.name] =
                            element.value;
                    }
                }
                if (element.name.includes("email")) {
                    contactinfo.contactinfo.email[element.name] = element.value;
                }
            }
        });

        console.log(contactinfo);

      updateUser(user, token, null, null, contactinfo);
      loadData(user, token);
    };

  const loadData = async (_id, tokens) => {
      const dataResponse = await loadDataUser(_id, tokens);
      const { user } = dataResponse;
      setDireccion(user.contactinfo.direccion);
      setTelefono(user.contactinfo.telefono);
      setMail(user.contactinfo.email);
  };
  
    useEffect(() => {
        
        loadData(user, token);
    }, [user, token]);

    return (
        <div
            id="contact"
            className="container row p-5 d-flex align-items-center m-auto"
        >
            <div className="d-flex justify-content-end col-md-10">
                <img
                    src={logo}
                    id="logo"
                    alt="Logo Coder"
                    className="col-md-2"
                />
            </div>
            <form
                className="d-flex justify-content-end col-md-10"
                action=""
                onSubmit={handleOnSubmit}
            >
                <div className="col-md-10">
                    <div className="col-md-12 mx-auto">
                        {Object.values(direccion).map((value, index) => (
                            <Direccion
                                key={index}
                                number={index + 1}
                                value={value}
                            />
                        ))}
                        <button
                            type="button"
                            className="button-transparent my-5 px-4 py-3"
                            onClick={handleAddDireccion}
                        >
                            Agregar otra dirección
                        </button>
                    </div>
                    <div className="col-md-12 mx-auto row d-flex justify-content-between">
                        <div className="col-md-5 mt-2 mb-3">
                            {Object.values(telefono).map((value, index) => (
                                <Telefono
                                    key={index}
                                    number={index + 1}
                                    value={value}
                                />
                            ))}
                            <button
                                type="button"
                                className="button-transparent mt-5 px-4 py-3 mb-3"
                                onClick={handleAddTelefono}
                            >
                                Agregar otro teléfono
                            </button>
                        </div>
                        <div className="col-md-5 mt-2 mb-3">
                            {Object.values(email).map((value, index) => (
                                <Mail
                                    key={index}
                                    number={index + 1}
                                    value={value}
                                />
                            ))}
                            <button
                                type="button"
                                className="button-transparent mt-5 px-4 py-3 mb-2"
                                onClick={handleAddMail}
                            >
                                Agregar otro mail
                            </button>
                        </div>
                    </div>
                    <div className="mx-auto mt-5 col-md-12 d-flex justify-content-center ">
                        <button
                            type="submit"
                            className="button-orange px-5 py-3"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
