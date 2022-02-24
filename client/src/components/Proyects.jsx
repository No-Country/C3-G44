import React, { useContext } from "react";
import { Proyect } from "../components/Proyect";
import { UserContext } from "../context/UserContext";
import { Url } from "../lib/Url";

export const Proyects = () => {
    const { stateUser } = useContext(UserContext)
    const { user } = stateUser
    const { recentproyects, _id } = user
    const proyects = Object.values(recentproyects)
    return (
        <section id="projects">
            <div className="projects container">
                <div className="projects-header">
                    <h1 className="section-title">
                        Recent <span>Projects</span>
                    </h1>
                </div>
                <div className="all-projects">
                    {proyects.map(({ title, subtitle = 'Coding is Love', description}, index) => (
                        <Proyect
                            tittle={title}
                            subtittle={subtitle}
                            text={description}
                            img={`${Url}/user/viewimg/?id=${_id}&name=proyect${index}`}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
