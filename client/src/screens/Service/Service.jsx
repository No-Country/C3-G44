import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { loadDataUser } from "../../helpers/loadDataUser";
import { Puesto } from "./Puesto";
import "./Service.css";

export const Service = () => {
    const { stateUser } = useContext(UserContext);
    const { user } = stateUser;
    const { data } = stateUser;
    const { token } = data;

    const [services, setServices] = useState({
        general: "",
    });

  const handleAddPuesto = () => {
    const service = {}
    service['service'+ Object.keys(services).length] = {}
      setServices({ ...services, service});
    };

  const handleChange = (e) => {
      setServices({...services, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(
          Object.values(services).filter(
              (element) => typeof element === "object"
          )
      );

      // loadData(user, token);
    };

    const loadData = async (_id, tokens) => {
        const dataResponse = await loadDataUser(_id, tokens);
        const { user } = dataResponse;
        setServices(user.service);
        
    };

    useEffect(() => {
        loadData(user, token);
    }, [user, token]);

    return (
        <form
            id="service"
            className="container row m-auto  p-5 d-flex align-items-center"
            onSubmit={handleSubmit}
        >
            <div className="col-md-10">
                <h2 className="mb-5"> Experiencia laboral</h2>
                <textarea
                    type="text"
                    name="general"
                    placeholder="En este espacio podés hacer una descripción general de tu experiencia laboral"
                    className="description-input col-md-12"
                    value={services.general}
                    onChange={handleChange}
                />
            </div>
            {Object.values(services)
                .filter((element) => typeof element === "object")
                .map((service, index) => (
                    <Puesto key={index} service={service} />
                ))}
            <div className="col-md-10 d-flex justify-content-center mb-5">
                <button
                    className="button-transparent px-4 py-3"
                    type="button"
                    onClick={handleAddPuesto}
                >
                    Agregar otro puesto
                </button>
            </div>
            <div className=" col-md-10 d-flex justify-content-center mb-5">
                <button className="button-orange px-5 py-3">Subir</button>
            </div>
        </form>
    );
};
