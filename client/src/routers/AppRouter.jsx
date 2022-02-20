import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Admin } from '../screens/Admin';
import { Porfolio } from '../screens/Porfolio';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route end path="/porfolio" element={<Porfolio />} />
                <Route end path="/admin" element={<Admin />} />
            </Routes>
        </>
    );
};
