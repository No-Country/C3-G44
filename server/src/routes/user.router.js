import { Router } from 'express';

import {
    createImg,
    viewImg,
    createUser,
    getUserMailPass,
    viewImgUser,
    updateUser,
    getUserId,
    getDataAuthUserId,
    getUserAll,
    deleteUser,
    logoutUser,
    terminos,
    viewCVUser,
} from '../controller/user.controller';

import { verifyToken } from '../libs/VerifyToken';

import { upload } from '../libs/ImageMulter';

const router = Router();

//  Crea Img
// router.post("/createimg", upload.single("img"), createImg);
router.post(
    '/createimg',
    upload.fields([{ name: 'img', maxCount: 10 }]),
    createImg
);
// ver Img
router.get('/viewimg', viewImg);

// Crear Usuarios
router.post('/create', createUser);

// Login de Usuarios
router.post('/login', getUserMailPass);

// Ver terminos y condiciones
router.get('/terminos', terminos);

// Buscar usuarios por id
router.get('/:id', getUserId);

// Ver imagen de Usuario
router.get('/imagen/:id', viewImgUser);

// ver archivo pdf CV de Usuario
router.get('/cv/:id', viewCVUser);

// Buscar todos los Usuarios
router.get('/all', verifyToken, getUserAll);

// Retorna Autenticacion y data por _id
router.get('/data/:id', verifyToken, getDataAuthUserId) 

// Actualizar Usuarios
router.put('/update/:id', upload.single('avatar'), verifyToken, updateUser);

// Delete Usuario
router.delete('/delete/:id', verifyToken, deleteUser);

// Logout de usuario
router.post('/logout', verifyToken, logoutUser);

// Exporto el enrutador
export default router;
