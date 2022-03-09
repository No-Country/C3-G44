import React, { useContext } from 'react';
import './Projects.css';
import logo from '../../assets/img/logo_coder.png';
import { useState } from 'react';
import { Project } from './Project';
import { useEffect } from 'react';
import { loadDataUser } from '../../helpers/loadDataUser';
import { UserContext } from '../../context/UserContext';
import { updateUser } from '../../helpers/updateUser';

export const Projects = () => {
    const [imgHover, setImgHover] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputsText = [...e.target].filter(
                (element) => element.name !== '' && element.value !== '' && element.type !== 'file'
        )
        const inputsFiles = [...e.target].filter(
            (element) =>
                element.name !== '' &&
                element.value !== '' &&
                element.type === 'file'
        );

        const projects = { recentproyects: {} }
        const imgProyects = inputsFiles.map((element) => element.files[0])

        inputsText
            .map(
                (element, index) =>
                    (index + 1) % 3 === 0 &&
                    (projects.recentproyects[`project${(index + 1) / 3}`] = {
                        [inputsText[index - 2].name]: inputsText[index - 2].value,
                        [inputsText[index - 1].name]: inputsText[index - 1].value,
                        [inputsText[index].name]: inputsText[index].value,
                    })
            )
            .filter((element) => element !== false); 
        console.log(
            imgProyects
        );

        updateUser(user, token, null, imgProyects, projects, null);
        loadData(user, token);
    };

    const loadData = async (_id, tokens) => {
        const dataResponse = await loadDataUser(_id, tokens);
        const { user } = dataResponse;
        user.recentproyects
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
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="d-flex justify-content-end col-md-10"
                >
                    <div className="row ">
                        {Object.values(projects).map((project, index) => (
                            <Project key={index} project={project} />
                        ))}

                        <button
                            type="button"
                            className="btn-upload col-sm-4 text-center"
                            onClick={handleAddProject}
                        >
                            Agregar otro proyecto
                        </button>
                        <button
                            type="submit"
                            className="btn-upload col-sm-4 text-center"
                        >
                            <div className="container-button-img">
                                <img src="/img/save.png" alt="save" />
                            </div>
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
