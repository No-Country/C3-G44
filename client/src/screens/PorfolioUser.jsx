import React, { useContext, useEffect, useState } from 'react';

import { About } from '../components/About';
import { Banner } from '../components/Banner';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Proyects } from '../components/Proyects';
import { Services } from '../components/Services';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { UserTypes } from '../types/UserTypes';
import { loadPorfolioUser } from '../helpers/loadPorfolioUser';

export const PorfolioUser = () => {
    const [load, setLoad] = useState(false);
    const { dispatchUser } = useContext(UserContext);
    const [dataUser, setDataUser] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const loadData = async (_id) => {
            const dataResponse = await loadPorfolioUser(_id);
            const { data, user } = dataResponse;
            setDataUser(user);
            dispatchUser({
                type: UserTypes.load,
                payload: { data, user: user._id },
            });
        };
        if (!load) {
            loadData(id);
            setLoad(true);
        }
    }, [dispatchUser, id, load]);

    return dataUser && load ? (
        <div>
            <Header user={dataUser} />
            <Banner user={dataUser} />
            <About user={dataUser} />
            <Services user={dataUser} />
            <Proyects user={dataUser} />
            <Contact user={dataUser} />
            <Footer user={dataUser} />
        </div>
    ) : (
        <h1>Loading....</h1>
    );
};
