import React from "react";
import { Proyect } from "../components/Proyect";
import { Url } from "../lib/Url";

export const Proyects = ({user}) => {

    const { recentproyects, _id } = user
    const proyects = recentproyects && Object.values(recentproyects)
    return (
        <section id="projects">
            <div className="projects container">
                <div className="projects-header">
                    <h1 className="section-title">
                       Mis <span>Pproyectos</span>
                    </h1>
                </div>
                <div className="all-projects">
                    {proyects && proyects.map(({ title, subtitle, description}, index) => (
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
