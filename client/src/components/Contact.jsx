import React from 'react';
import { ItemContact } from '../components/ItemContact';

export const Contact = ({ user }) => {
    const { contactinfo } = user.hasOwnProperty('contactinfo') ? user : {contactinfo: {}};
    const { telefono } = contactinfo.hasOwnProperty('telefono')
        ? contactinfo
        : {telefono: null};
    const { email } = contactinfo.hasOwnProperty('email') ? contactinfo : {email: null};
    const { direccion } = contactinfo.hasOwnProperty('direccion')
        ? contactinfo
        : {direccion: null};

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
                    {telefono && (
                        <ItemContact
                            icon={icons.phone}
                            tittle={'Phone'}
                            subtittle={telefono}
                        />
                    )}
                    {email && (
                        <ItemContact
                            icon={icons.email}
                            tittle={'Email'}
                            subtittle={email}
                        />
                    )}
                    {direccion && (
                        <ItemContact
                            icon={icons.adrdres}
                            tittle={'Adress'}
                            subtittle={direccion}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
