import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import Username from '../models/username.model';
import config from '../config';

// Crear administrador
export const createAdmin = async (req, res) => {
    try {
        const { nombre, user, password } = req.body;
        const admin = new Admin({
            nombre,
            user,
            password,
            rol: 'admin',
        });

        const name = await Admin.findOne({ user });

        if (name) {
            res.status(200).json({
                auth: true,
                mensaje: 'Ya existe una cuenta con este nombre de usuario',
            });
        } else {
            // Encryptar contraseña
            admin.password = await admin.encryptPassword(password);

            // Crea token
            const token = jwt.sign({ id: admin._id }, config.secret, {
                expiresIn: 60 * 60 * 2, //Expira en 2 horas
            });

            await admin.save();

            res.status(200).json({
                auth: true,
                id: admin._id,
                token,
                rol: admin.rol,
                nombre: admin.nombre,
                mensaje: 'Se creo administrador correctamente',
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ auth: true, mensaje: 'Ocurrio un error', error });
    }
};

// Login de Administradores
export const getAdminUserPass = async (req, res) => {
    const admin = await Admin.findOne({ user: req.body.user }).select(
        '+password'
    );

    // Verifico si no se encontro el usuario en base de datos
    if (!admin) {
        return res.json({ auth: false, mensaje: 'No existe administrador' });
    }

    const validPassword = await admin.comparePassword(
        req.body.password,
        admin.password
    );

    // Si la validacion de contraseñaes incorrecta
    if (!validPassword) {
        return res.json({
            auth: false,
            token: null,
            mensaje: 'Contraseña Incorrecta',
        });
    }

    const token = jwt.sign({ id: admin._id }, config.secret, {
        expiresIn: 60 * 60 * 2,
    });

    res.status(200).json({
        auth: true,
        mensaje: 'Autenticacion correcta',
        id: admin._id,
        token,
        rol: admin.rol,
    });
};

// Consultar administradores
export const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({
            auth: true,
            mensaje: 'Se encontraron administradores',
            admins,
        });
    } catch (error) {
        return res
            .status(404)
            .json({ auth: true, mensaje: 'Ocurrio un error', error });
    }
};

// consultar administrador por id
export const findAdminId = async (req, res) => {
    try {
        const _id = req.params.id;
        const response = await Admin.findById({ _id }).select('-password');
        res.status(200).json({
            auth: true,
            mensaje: 'Se encontro administrador',
            response,
        });
    } catch (error) {
        return res
            .status(404)
            .json({ auth: true, mensaje: 'Ocurrio un error', error });
    }
};

// Modificar administrador
export const updateAdmin = async (req, res) => {
    const _id = req.params.id;
    const { nombre, user, password } = req.body;

    const admin = new Admin({
        nombre,
        user,
        password,
    });

    // Se encripta contraseña
    admin.password = await admin.encryptPassword(password);

    const data = {
        nombre: admin.nombre,
        user: admin.user,
        password: admin.password,
    };

    try {
        const response = await Admin.findByIdAndUpdate({ _id }, data, {
            new: true,
        }).select('-password');
        if (!response) {
            return res.status(200).json({
                auth: true,
                mensaje: 'No se encontro administrador',
                response,
            });
        }
        res.status(200).json({
            auth: true,
            mensaje: 'Se modifico usuario correctamente',
            response,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(404)
            .json({ auth: true, mensaje: 'Ocurrio un error', error });
    }
};

// Eliminar administrador
export const deleteAdmin = async (req, res) => {
    const _id = req.params.id;

    try {
        const response = await Admin.findByIdAndDelete({ _id });
        if (!response) {
            return res.status(404).json({
                auth: true,
                mensaje: 'No se encontro Administrador',
            });
        }
        res.status(200).json({
            auth: true,
            mensaje: 'Administrador eliminado correctamente',
        });
    } catch (error) {
        return res.status(404).json({
            auth: true,
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};

// Consultar usuarios
export const getUser = async (req, res) => {
    try {
        const response = await Username.find();
        if (!response) {
            return res.status(404).json({
                auth: true,
                mensaje: 'No se encontraron usuarios',
            });
        }
        res.status(200).json({
            auth: true,
            mensaje: 'Se encontraron usuarios',
            response,
        });
    } catch (error) {
        return res
            .status(404)
            .json({ auth: true, mensaje: 'Ocurio un error', error });
    }
};

// Modificar datos de usuarios
export const updateUser = async (req, res) => {
    const _id = req.params.id;
    const {
        nombre,
        mail,
        password,
        direccion,
        telefono,
        actividad,
        msg_description,
        departamento,
        ciudad,
        visible,
    } = req.body;

    let body = {};

    if (req.file) {
        const data = req.file.buffer;
        // const data = req.body.img; // Postman
        const contentType = req.file.mimetype;
        // const contentType = req.body.img.type; //Postman
        const img = { data, contentType };

        const user = new Username({
            nombre,
            mail,
            password,
            direccion,
            departamento,
            ciudad,
            telefono,
            actividad,
            msg_description,
            visible,
            img,
        });

        if (user.nombre !== '') body['nombre'] = user.nombre;
        if (user.mail !== '') body['mail'] = user.mail;
        if (user.password !== '') {
            // Encryptando contraseña
            user.password = await user.encryptPassword(password);
            body['password'] = user.password;
        }
        if (user.ciudad !== '') body['ciudad'] = user.ciudad;
        if (user.departamento !== '') body['departamento'] = user.departamento;
        if (user.direccion !== '') body['direccion'] = user.direccion;
        if (user.telefono !== '') body['telefono'] = user.telefono;
        if (user.actividad !== '') body['actividad'] = user.actividad;
        if (user.msg_description !== '')
            body['msg_description'] = user.msg_description;
        body['img'] = user.img;
    } else {
        const user = nuser({
            nombre,
            mail,
            password,
            direccion,
            departamento,
            ciudad,
            telefono,
            actividad,
            msg_description,
            visible,
        });

        if (user.nombre !== '') body['nombre'] = user.nombre;
        if (user.mail !== '') body['mail'] = user.mail;
        if (user.password !== '') {
            // Encryptando contraseña
            user.password = await user.encryptPassword(password);
            body['password'] = user.password;
        }
        if (user.ciudad !== '') body['ciudad'] = user.ciudad;
        if (user.departamento !== '')
            body['departamento'] = user.departamento;
        if (user.direccion !== '')
            body['direccion'] = user.direccion;
        if (user.telefono !== '')
            body['telefono'] = user.telefono;
        if (user.actividad !== '')
            body['actividad'] = user.actividad;
        if (user.msg_description !== '')
            body['msg_description'] = user.msg_description;

        body['visible'] = user.visible;
    }

    try {
        const registro = await Username.findByIdAndUpdate(_id, body, {
            new: true,
        });
        res.status(200).json({
            auth: true,
            id: registro._id,
            mensaje: 'Actualizacion Exitosa',
        });
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ auth: true, mensaje: 'Ocurrio un error', err });
    }
};

// Eliminar eusuarios
export const deleteUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const response = await Username.findByIdAndDelete({ _id });

        if (!response) {
            return res
                .status(404)
                .json({ auth: true, mensaje: 'No se encontro usuario' });
        }

        res.status(200).json({
            auth: true,
            mensaje: 'Se elimino usuario',
            response,
        });
    } catch (error) {}
};
