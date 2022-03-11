import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Admin } from '../screens/Admin';
import { Home } from '../screens/Home/Home';
import { Porfolio } from '../screens/Porfolio';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route end path="/home" element={<Home />} />
                <Route end path="/admin" element={<Admin />} />
                <Route end path="/porfolio" element={<Porfolio />} />
            </Routes>
        </>
    );
};
