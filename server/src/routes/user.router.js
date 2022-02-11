import { Router } from 'express';

import {
    createUser,
    getUserMailPass,
    viewImgUser,
    updateUser,
    getUserId,
    getUserAll,
    deleteUser,
    logoutUser,
    terminos,
} from '../controller/user.controller';

import { verifyToken } from '../libs/VerifyToken';

import { upload } from '../libs/ImageMulter';

const router = Router();

// // Crear Usuarios
router.post('/create', upload.single('avatar'), createUser);

// // Login de Usuarios
router.post('/login', getUserMailPass);

// // Ver terminos y condiciones
router.get('/terminos', terminos);

// // Buscar todos los Usuarios
router.get('/all', verifyToken, getUserAll);

// // Buscar usuarios por id
router.get('/:id', verifyToken, getUserId);

// // Ver imagen de Usuario
router.get('/imagen/:id', viewImgUser);

// // Actualizar Usuarios
router.put('/update/:id', upload.single('avatar'), verifyToken, updateUser);

// // Delete Usuario
router.delete('/delete/:id', verifyToken, deleteUser);

// // Logout de usuario
router.post('/logout', verifyToken, logoutUser);

// Exporto el enrutador
export default router;