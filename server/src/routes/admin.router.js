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
    arch,
    viewImg
} from '../controller/admin.controller';
import { verifyToken } from '../libs/VerifyToken'
import { upload } from '../libs/ImageMulter';

const router = Router();

// Ver imagenes
router.get('/img', viewImg)

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

// Consulta todos los Emprendedores
router.get('/finduser', verifyToken, getUser);

// Actualiza emprendedor
router.put(
    '/updateuser/:id',
    upload.single('img'),
    verifyToken,
    updateUser
);

// Elimina emprendedor
router.delete('/deleteuser/:id', verifyToken, deleteUser);

export default router;
