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
} from '../controller/admin.controller';
import { verifyToken } from '../libs/VerifyToken'
import { upload } from '../libs/ImageMulter';

const router = Router();

// Crea Administrador
router.post('/create', createAdmin);

// Consulta todos los Administradores
router.get('/find', verifyToken, getAdmin);

// login de Administrador
router.post('/login', getAdminUserPass);

// Busca Administrador por id
router.get('/findid/:id', verifyToken, findAdminId);

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
