import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Admin } from '../screens/Admin';
import { About } from '../screens/About/About';
import { Contact } from '../screens/Contact/Contact';
import { Footer } from '../screens/Footer/Footer';
import { Home } from '../screens/Home/Home';
import { Origin } from '../screens/Origin/Origin';
import { Projects } from '../screens/Projects/Projects';
import { Service } from '../screens/Service/Service';
import { PorfolioUser } from '../screens/PorfolioUser';
import { Register } from '../screens/Register/Register';
import { AppRouter } from './AppRouter';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { Login } from '../screens/Login/Login';

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
                {/*Inicio Rutas libres para trabajar sobre componentes y screens */}

                <Route path="/admin" element={<Admin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/origin" element={<Origin />} />
                <Route path="/about" element={<About />} />
                <Route path="/service" element={<Service />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/footer" element={<Footer />} />

                {/*Fin Rutas libres para trabajar sobre componentes y screens */}

                <Route path="/porfolio/:id" element={<PorfolioUser />} />
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
