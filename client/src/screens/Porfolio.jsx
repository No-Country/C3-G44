import React, { useContext, useEffect, useState } from 'react';
import { About } from '../components/About';
import { Banner } from '../components/Banner';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Proyects } from '../components/Proyects';
import { Services } from '../components/Services';
import { UserContext } from '../context/UserContext';
import { loadDataUser } from '../helpers/loadDataUser';
import { UserTypes } from '../types/UserTypes';

export const Porfolio = () => {
    const [load, setLoad] = useState(false);
    const { dispatchUser, stateUser } = useContext(UserContext);
    const [dataUser, setDataUser] = useState(null);

    const { user, data } = stateUser;
    const { token } = data;

    useEffect(() => {
        const loadData = async (_id, token) => {
            const dataResponse = await loadDataUser(_id, token);
            const { data, user } = dataResponse;
          setDataUser(user);
            dispatchUser({
                type: UserTypes.load,
                payload: { data, user: user._id },
            });
        };
        if (!load) {
            loadData(user, token);
            setLoad(true);
        }
    }, [dispatchUser, user, token, load]);

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
