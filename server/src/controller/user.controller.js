import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';
import path from 'path';

//Crear Usuario
export const createUser = async (req, res) => {
    try {
        const { email, password, nombreCompleto } = req.body;

        const user = new User({
            email,
            password,
            nombreCompleto,
            rol: 'user',
        });

        const correo = await User.findOne({ email });

        if (correo) {
            res.status(200).json({
                mensaje: 'Ya existe una cuenta con este email',
            });
        } else {
            // Encryptar contraseña
            user.password = await user.encryptPassword(password);

            // Crea token
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 60 * 60 * 2, //Expira en 2 horas
            });

            await user.save();

            res.status(200).json({
                data: {
                    auth: true,
                    mensaje: 'Bienvenido ' + user.nombreCompleto,
                    token,
                    rol: user.rol,
                },
                user: user._id,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};

// Consulta base de datos por email y password Login
export const getUserMailPass = async (req, res) => {
    // Consulto usuario por email si lo encuentra devuelve datos de usuario
    const user = await User.findOne({
        email: req.body.email,
    }).select('+password');

    // Verifico si no se encontro el email en base de datos
    if (!user) {
        return res.json({
            data: { auth: false, mensaje: 'Email no esta registrado' },
        });
    }

    // Si el usuario existe comparo contraseña
    const validPassword = await user.comparePassword(
        req.body.password,
        user.password
    );

    // Si la validacion de contraseña es incorrecta
    if (!validPassword) {
        return res.json({
            data: {
                auth: false,
                token: null,
                mensaje: 'Contraseña incorrecta',
            },
        });
    }

    // Si la contraseña es correcta creo token por 2 horas
    const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 2,
    });
    user.password = undefined;
    user.avatar = undefined;
    user.imgProyects = undefined;

    res.status(200).json({
        data: {
            auth: true,
            mensaje: 'Bienvenido ' + user.nombreCompleto,
            token,
            rol: user.rol,
        },
        user: user._id,
    });
};

// Consultar base de datos por id de usuario
export const getUserId = async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findOne(
            { _id },
            { avatar: 0, imgProyects: 0 }
        ).select('-password');
        user.password = undefined;
        user.avatar = undefined;
        user.imgProyects = undefined;
        res.json({ data: { auth: false, token: null }, user });
    } catch (error) {
        return res.status(400).json({
            data: { auth: false, mensaje: 'Ocurrio un error', error },
        });
    }
};

// Consultar base de datos por id de usuario devuelve token y auth
export const getDataAuthUserId = async (req, res) => {
    const _id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    try {
        const user = await User.findOne(
            { _id },
            { avatar: 0, imgProyects: 0, cv: 0 }
        ).select('-password');
        res.json({ data: { auth: true, token }, user });
    } catch (error) {
        return res.status(400).json({
            data: { auth: false, mensaje: 'Ocurrio un error', error },
        });
    }
};

// Consultar todos los usuarios
export const getUserAll = async (req, res) => {
    try {
        const users = await User.find({}, { avatar: 0 });
        res.status(200).json({
            auth: true,
            users,
        });
    } catch (error) {
        return res.status(400).json({
            auth: true,
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};

// Ver imagen avatar de usuario
export const viewImgUser = async (req, res) => {
    const _id = req.params.id;

    try {
        const resp = await User.findOne({ _id }, { avatar: 1 });
        res.set('Content-Type', resp.avatar.contentType);
        res.send(resp.avatar.data);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};

// Ver archivo pdf cv de usuario
export const viewCVUser = async (req, res) => {
    const _id = req.params.id;

    try {
        const resp = await User.findOne({ _id }, { cv: 1 });
        res.set('Content-Type', resp.cv.contentType);
        res.send(resp.cv.data);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const _id = req.params.id;
    const { nombre, email, password, direccion, telefono, pais, ciudad } =
        req.body;

    let body = {};

    if (req.file) {
        const data = req.file.buffer;
        const contentType = req.file.mimetype;
        const avatar = { data, contentType };

        const user = new User({
            nombre,
            email,
            password,
            direccion,
            pais,
            ciudad,
            telefono,
            avatar,
        });

        if (user.nombre !== '') body['nombre'] = user.nombre;
        if (user.email !== '') body['email'] = user.email;
        if (user.password !== '') {
            // Encryptando contraseña
            user.password = await user.encryptPassword(password);
            body['password'] = user.password;
        }
        if (user.ciudad !== '') body['ciudad'] = user.ciudad;
        if (user.pais !== '') body['pais'] = user.pais;
        if (user.direccion !== '') body['direccion'] = user.direccion;
        if (user.telefono !== '') body['telefono'] = user.telefono;
        body['avatar'] = user.avatar;
    } else {
        const user = new User({
            nombre,
            email,
            password,
            direccion,
            pais,
            ciudad,
            telefono,
        });

        if (user.nombre !== '') body['nombre'] = user.nombre;
        if (user.email !== '') body['email'] = user.email;
        if (user.password !== '') {
            // Encryptando contraseña
            user.password = await user.encryptPassword(password);
            body['password'] = user.password;
        }
        if (user.ciudad !== '') body['ciudad'] = user.ciudad;
        if (user.pais !== '') body['pais'] = user.pais;
        if (user.direccion !== '') body['direccion'] = user.direccion;
        if (user.telefono !== '') body['telefono'] = user.telefono;
    }

    try {
        const registro = await User.findByIdAndUpdate(_id, body, {
            new: true,
        });
        res.status(200).json({
            auth: true,
            id: registro._id,
            mensaje: 'Actualizacion Exitosa',
        });
    } catch (err) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            err,
        });
    }
};

// actualizar Proyecto de usuario
export const updateProject = async (req, res) => {
    const _id = req.params.id;
    const project = req.body;
    const img = req.file;
    const { number, title, subtitle, description } = project;

    const body = {};

    try {
        const user = await User.findOne(
            { _id },
            {
                email: 0,
                nombreCompleto: 0,
                rol: 0,
                aboutme: 0,
                service: 0,
                avatar: 0,
                contactinfo: 0,
                cv: 0,
            }
        ).select('-password');

        if (img) {
            const imgProyects = [...user.imgProyects] ?? [];
            const data = img.buffer;
            const contentType = img.mimetype;
            const name = `proyect${number}`;
            const project = {data, name, contentType}
            imgProyects.splice(number, 1, project)
            body['imgProyects'] = imgProyects;
        }

        const recentproyects = user.recentproyects ?? {};

        recentproyects[`project${number}`] = { title, subtitle, description };
        body['recentproyects'] = recentproyects;
        
        // console.log(body.imgProyects);
        
        const registro = await User.findByIdAndUpdate(_id, body, {
            new: true,
        });
        res.status(200).json({
            auth: true,
            id: registro._id,
            mensaje: 'Actualizacion Exitosa',
        });

    } catch (error) {}
};

// Eliminar Proyecto de usuario
export const removeProject = async (req, res) => {
    const _id = req.params.id;
    const {data} = req.body;

    const body = {};

    try {
        const user = await User.findOne(
            { _id },
            {
                email: 0,
                nombreCompleto: 0,
                rol: 0,
                about: 0,
                service: 0,
                avatar: 0,
                contactinfo: 0,
            }
        ).select('-password');

        
        const imgProyects = user.imgProyects;
        imgProyects.splice(data, 1);

        body['imgProyects'] = imgProyects;

        const recentproyects = user.recentproyects;
        delete recentproyects[`project${data}`];

        body['recentproyects'] = recentproyects;
        

        const registro = await User.findByIdAndUpdate(_id, body, {
            new: true,
        });


        res.status(200).json({
            auth: true,
            id: registro._id,
            mensaje: 'Actualizacion Exitosa',
        });
    } catch (error) {}
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const response = await User.findByIdAndDelete({ _id });

        if (!response) {
            return res.status(404).json({ mensaje: 'No se encontro usuario' });
        }

        res.status(200).json({
            auth: true,
            mensaje: 'Se elimino usuario',
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};

// Logout de usuario
export const logoutUser = async (req, res) => {
    res.status(200).send({ auth: false, token: null });
};

// Terminos y condiciones
export const terminos = async (req, res) => {
    const options = {
        root: path.join(__dirname),
    };

    const fileName = 'TERMINOS_Y_CONDICIONES.png';

    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
};

// Prueba de imagenes en array
export const createImg = async (req, res) => {
    console.log(req.body);

    const { email, password, user } = req.body;
    console.log(email, password, user);

    try {
        const img = req.files.img.map((file, index) => {
            const data = file.buffer;
            const contentType = file.mimetype;
            const name = `proyect${index}`;
            return { data, contentType, name };
        });

        const username = new User({
            img,
            rol: 'user',
            email,
            password,
            user,
        });

        await username.save();

        res.status(200).json({
            mensaje: 'Registro exitoso',
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ auth: true, mensaje: 'Ocurrio un error', error });
    }
};

// Ver imagenes
export const viewImg = async (req, res) => {
    const _id = req.query.id;
    const name = req.query.name;
    try {
        const resp = await User.findOne({ _id }, { imgProyects: 1 });

        const img = resp.imgProyects.find((file) => file.name === name);

        res.set('Content-Type', img.contentType);
        res.send(img.data);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};
