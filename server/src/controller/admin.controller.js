import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import User from '../models/user.model';
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

    // Si la validacion de contraseña es incorrecta
    if (!validPassword) {
        return res.json({
            auth: false,
            token: null,
            mensaje: 'Contraseña Incorrecta',
        });
    }

    // Se crea token que expira en 2 horas
    const token = jwt.sign({ id: admin._id }, config.secret, {
        expiresIn: 60 * 60 * 2,
    });

    res.status(200).json({
        auth: true,
        mensaje: 'Autenticacion correcta',
        id: admin._id,
        token,
        rol: admin.rol,
        nombre: admin.nombre,
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
    const { password } = req.body;

    const admin = new Admin({
        ...req.body,
    });

    // Se encripta contraseña si la contraseña existe
    if (password && password !== '') {
        admin.password = await admin.encryptPassword(password);
    } else {
        admin.password = undefined;
    }

    // Verifica si existe user
    if (!admin.user && admin.user === '') {
        admin.user = undefined;
    }

    // Verifica si existe nombre
    if (!admin.nombre && admin.nombre === '') {
        admin.nombre = undefined;
    }

    // pasando el admin sin object _id
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
            mensaje: 'Se modifico administrador correctamente',
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
        const response = await User.find();
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

// Modificar imagenes de usuarios
export const updateUser = async (req, res) => {
    const _id = req.params.id;

    const user = new User({
        avatar: [],
        imgProyects: [],
        cv: [],
    });

    const files = { ...req.files };

    if (files.hasOwnProperty('avatar')) {
        const data = files.avatar[0].buffer;
        const contentType = files.avatar[0].mimetype;
        const avatar = { data, contentType };
        user.avatar = avatar;
    } else {
        user.avatar = undefined;
    }

    if (files.hasOwnProperty('images')) {
        const imgProyects = files.images.map((file, index) => {
            const data = file.buffer;
            const contentType = file.mimetype;
            const name = `proyect${index}`;
            return { data, contentType, name };
        });
        user.imgProyects = imgProyects;
    } else {
        user.imgProyects = undefined;
    }

    if (files.hasOwnProperty('cv')) {
        const data = files.cv[0].buffer;
        const contentType = files.cv[0].mimetype;
        const cv = { data, contentType };
        user.cv = cv;
    } else {
        user.cv = undefined;
    }

    const data = {
        avatar: user.avatar,
        imgProyects: user.imgProyects,
        cv: user.cv,
    };

    try {
        const registro = await User.findByIdAndUpdate(_id, data, {
            new: true,
        });
        res.status(200).json({
            auth: true,
            id: registro._id,
            mensaje: 'Actualizacion Imagenes Exitosa',
        });
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ auth: true, mensaje: 'Ocurrio un error', err });
    }
};

// Actualizar solo datos usuario
export const updateDataUser = async (req, res) => {
    const _id = req.params.id;

    const { password } = req.body;

    const user = new User({
        ...req.body,
    });

    console.log(user);
    console.log(req.body);
    // Se encripta contraseña si la contraseña existe
    if (password && password !== '') {
        user.password = await user.encryptPassword(password);
    } else {
        user.password = undefined;
    }

    // Se verifica campo email
    if (!user.email && user.email === '') {
        user.email = undefined;
    }

    // Se verifica campo nombreCompleto
    if (!user.nombreCompleto && user.nombreCompleto === '') {
        user.nombreCompleto = undefined;
    }

    // Se verifica campo aboutme
    if (!user.aboutme && user.aboutme === '') {
        user.aboutme = undefined;
    }

    // Se verifica campo service
    if (!user.service && user.service === '') {
        user.service = undefined;
    }

    // Se verifica campo recentproyects
    if (!user.recentproyects && user.recentproyects === '') {
        user.recentproyects = undefined;
    }

    // Se verifica campo contacinfo
    if (!user.contactinfo && user.contactinfo === '') {
        user.contactinfo = undefined;
    }

    const data = {
        email: user.email,
        password: user.password,
        nombreCompleto: user.nombreCompleto,
        aboutme: user.aboutme,
        service: user.service,
        recentproyects: user.recentproyects,
        contactinfo: user.contactinfo,
    };

    try {
        const registro = await User.findByIdAndUpdate(_id, data, {
            new: true,
        });
        res.status(200).json({
            auth: true,
            id: registro._id,
            mensaje: 'Actualizacion Datos Exitosa',
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
        const response = await User.findByIdAndDelete({ _id });

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

export const pruebaMultimagenesUser = async (req, res) => {
    console.log({ ...req.files, ...req.body });
};
