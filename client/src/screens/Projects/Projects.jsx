import React, { useContext, useState, useEffect } from 'react';
import './Projects.css';
import logo from '../../assets/img/logo_coder.png';
import { Project } from './Project';
import { loadDataUser } from '../../helpers/loadDataUser';
import { UserContext } from '../../context/UserContext';

export const Projects = () => {
    const [projects, setProjects] = useState({});

    const { stateUser } = useContext(UserContext);
    const { user } = stateUser;
    const { data } = stateUser;
    const { token } = data;

    const handleAddProject = () => {
        setProjects({
            ...projects,
            [`project${Object.keys(projects).length + 1}`]: {
                title: '',
                subtitle: '',
                description: '',
            },
        });
    };

    const loadData = async (_id, tokens) => {
        const dataResponse = await loadDataUser(_id, tokens);
        const { user } = dataResponse;
        user?.recentproyects
            ? setProjects({ ...user.recentproyects })
            : setProjects({
                  proyect1: { title: '', subtitle: '', description: '' },
              });
    };

    useEffect(() => {
        loadData(user, token);
    }, [user, token]);

    return (
        <div id="projects" className="container row d-flex align-items-center">
            <div className="row ms-5">
                <div className="d-flex justify-content-end col-md-10">
                    <img src={logo} alt="Logo Coder" className="col-md-2" />
                </div>

                {Object.values(projects).map((project, index) => (
                    <Project
                        key={index}
                        project={project}
                        number={index}
                        user={user}
                        token={token}
                        loadData={() => loadData()}
                    />
                ))}

                <button
                    type="button"
                    className="btn-upload col-sm-4 text-center mb-5"
                    onClick={handleAddProject}
                >
                    Agregar otro proyecto
                </button>
            </div>
        </div>
    );
};
