import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { loadDataUser } from '../../helpers/loadDataUser';
import { updateUser } from '../../helpers/updateUser';
import { Puesto } from './Puesto';
import logo from '../../assets/img/logo_coder.png';

import './Service.css';


export const Service = () => {
    const { stateUser } = useContext(UserContext);
    const { user } = stateUser;
    const { data } = stateUser;
    const { token } = data;

    const [services, setServices] = useState({
        general: '',
    });


    const loadData = async (_id, tokens) => {
        const dataResponse = await loadDataUser(_id, tokens);
        const { user } = dataResponse;
        setServices(
            user.service ?? {
                general: '',
                service1: { title: '', description: '' },
            }
        );
    };

    const handleAddPuesto = () => {
        const service = {};
        service['service' + Object.keys(services).length] = {
            title: '',
            description: '',
        };
        setServices({ ...services, ...service });
    };

    const handleDeletePuesto = (e) => {
        const serv = { service: {} };
        const newServices = services;
        delete newServices[`service${e + 1}`];
        Object.values(newServices).map((element, i) =>
            i === 0
                ? (serv.service['general'] = element)
                : (serv.service[`service${i}`] = element)
        );
        setServices({
                general: '',
                service1: { title: '', description: '' },
            }
        );
        updateUser(user, token, null, null, serv, null);
        loadData(user, token);
    }

    const handleChange = (e) => {
        setServices({ ...services, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputs = [...e.target].filter(
            (element) => element.type === "text" || element.type === "textarea" || element.type === "date"
        );
        const serv = { service: {} };
        inputs
            .map((element, index) =>
                inputs.indexOf(element) === 0
                    ? (serv.service[element.name] = element.value)
                    : index % 5 === 0
                    ? (serv.service[`service${index / 5}`] = {
                          [inputs[index - 4].name]: inputs[index - 4].value,
                          [inputs[index - 3].name]: inputs[index - 3].value,
                          [inputs[index - 2].name]: inputs[index - 2].value,
                          [inputs[index - 1].name]: inputs[index - 1].value,
                          [inputs[index].name]: inputs[index].value,
                      })
                    : null
            )
            .filter((element) => element !== null);
        updateUser(user, token, null, null, serv, null);
        loadData(user, token);
    };

    

    useEffect(() => {
        loadData(user, token);
    }, [user, token]);

    
    return (
        <div
            id="service"
            className="container row m-auto  p-5 d-flex align-items-center"
        >
            <div className="d-flex justify-content-end">
                <img src={logo} alt="Logo Coder" className="col-md-2" />
            </div>
            <form
                // id="service"
                className="container row m-auto  p-5 d-flex align-items-center"
                onSubmit={handleSubmit}
            >
                <div className="col-md-10">
                    <h2 className="mb-5"> Experiencia laboral</h2>
                    <textarea
                        type="text"
                        name="general"
                        placeholder="En este espacio pod??s hacer una descripci??n general de tu experiencia laboral"
                        className="description-input col-md-12"
                        value={services?.general}
                        onChange={handleChange}
                    />
                </div>
                {Object.values(services)
                    .filter((element) => typeof element === 'object')
                    .map((service, index) => (
                        <Puesto
                            key={index}
                            service={service}
                            number={index}
                            handleDeletePuesto={(e) => handleDeletePuesto(e)}
                        />
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
                    <button className="btn-upload px-5 py-3">Guardar</button>
                </div>
            </form>
        </div>
    );
};

