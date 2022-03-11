import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import path from 'path';
import adminRoutes from './routes/admin.router';
import usernameRoutes from './routes/user.router'

const app = express();

// Midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Carpeta donde se enviara el front
app.use(express.static(path.join(__dirname, 'public')));

// Implementacion de rutas
app.use('/admin', adminRoutes);
app.use('/user', usernameRoutes);

// Implementa puerto
app.set('port', config.port);

export default app;
