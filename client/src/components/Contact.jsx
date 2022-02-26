import React, { useContext } from "react";
import { ItemContact } from "../components/ItemContact";
import { UserContext } from "../context/UserContext";

export const Contact = ({user}) => {
    // const { stateUser } = useContext(UserContext)
    // const { user } = stateUser
    const { contactinfo } = user
    const { telefono, email, direccion } = contactinfo
    const icons = {
        phone: 'https://img.icons8.com/bubbles/100/000000/phone.png',
        email: 'https://img.icons8.com/bubbles/100/000000/new-post.png',
        adrdres: 'https://img.icons8.com/bubbles/100/000000/map-marker.png',
    };
    
    return (
        <section id="contact">
            <div className="contact container">
                <div>
                    <h1 className="section-title">
                        Contact <span>info</span>
                    </h1>
                </div>
                <div className="contact-items">
                    <ItemContact
                        icon={icons.phone}
                        tittle={'Phone'}
                        subtittle={telefono}
                    />
                    <ItemContact
                        icon={icons.email}
                        tittle={'Email'}
                        subtittle={email}
                    />
                    <ItemContact
                        icon={icons.adrdres}
                        tittle={'Adress'}
                        subtittle={direccion}
                    />
                    {/* {items.map(
                        ({ icon, tittle, subtittle_1, subtittle_2 }, index) => (
                            <ItemContact
                                icon={icon}
                                tittle={tittle}
                                subtittle_1={subtittle_1}
                                subtittle_2={subtittle_2}
                                key={index}
                            />
                        )
                    )} */}
                </div>
            </div>
        </section>
    );
};
