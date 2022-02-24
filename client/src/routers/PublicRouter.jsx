import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const PublicRouter = ({children}) => {
    const { stateUser } = useContext(UserContext);
    const {auth} = stateUser;

    return !auth ? children : <Navigate to='/porfolio' />
};
