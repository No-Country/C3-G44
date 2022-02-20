import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../screens/Login';
import { AppRouter } from './AppRouter';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

export const LoginRouter = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRouter>
                            <Login />
                        </PublicRouter>
                    }
                />
                <Route
                    path="*"
                    element={
                        <PrivateRouter>
                            <AppRouter />
                        </PrivateRouter>
                    }
                />
            </Routes>
        </Router>
    );
};
