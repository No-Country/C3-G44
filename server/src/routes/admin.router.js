import { Router } from 'express';
import {
    createAdmin,
    getAdminUserPass,
    getAdmin,
    findAdminId,
    updateAdmin,
    deleteAdmin,
    getUser,
    updateUser,
    deleteUser,
    updateDataUser,
} from '../controller/admin.controller';
import { verifyToken } from '../libs/VerifyToken';
import { upload } from '../libs/ImageMulter';

const router = Router();

// login de Administrador
router.post('/login', getAdminUserPass);

// Crea Administrador
router.post('/create', verifyToken, createAdmin);

// Consulta todos los Administradores
router.get('/find', verifyToken, getAdmin);

// Busca Administrador por id
router.get('/find/:id', verifyToken, findAdminId);

// Actualiza Administrador
router.put('/update/:id', verifyToken, updateAdmin);

// Elimina un Administrador
router.delete('/delete/:id', verifyToken, deleteAdmin);

// Consulta todos los Usuarios
router.get('/finduser',  getUser);

// Actualiza Usuario
router.put(
    '/updateuser/:id',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cv', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]),
    verifyToken,
    updateUser
);

// Actualizar Solo Datos de Usuarios
router.put('/updatedatauser/:id', verifyToken, updateDataUser);

// Elimina Usuario
router.delete('/deleteuser/:id', verifyToken, deleteUser);

export default router;
