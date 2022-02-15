import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';
import path from 'path';

//Crear Usuario
export const createUser = async (req, res) => {
    try {
        const {
            email,
            password,
            nombreCompleto,
        } = req.body;

        let avatar;

        if (req.file) {
            const data = req.file.buffer;
            const contentType = req.file.mimetype;
            avatar = { data, contentType };
        }

        const user = new User({
            email,
            password,
            nombreCompleto,
            avatar,
            rol: 'user'
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
                auth: true,
                mensaje: 'Registro exitoso',
                id: user._id,
                token,
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
    const user = await User.findOne(
        {
            email: req.body.email,
        },
    ).select('+password');

    // Verifico si no se encontro el email en base de datos
    if (!user) {
        return res.json({ auth: false, mensaje: 'Email no esta registrado' });
    }

    // Si el usuario existe comparo contraseña
    const validPassword = await user.comparePassword(
        req.body.password,
        user.password
    );

    // Si la validacion de contraseña es incorrecta
    if (!validPassword) {
        return res.json({
            auth: false,
            token: null,
            mensaje: 'Contraseña incorrecta',
        });
    }

    // Si la contraseña es correcta creo token por 2 horas 
    const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 2,
    });
    res.status(200).json({
        auth: true,
        mensaje: 'Bienvenido ' + user.nombre,
        token,
        rol: user.rol
    });
};

// Consultar base de datos por id de usuario
export const getUserId = async (req, res) => {
    const _id = req.params.id;

    try {
        const register = await User.findOne({ _id }, { avatar: 0 }).select(
            '-password'
        );
        res.json({ auth: true, register });
    } catch (error) {
        return res
            .status(400)
            .json({ auth: true, mensaje: 'Ocurrio un error', error });
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

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const _id = req.params.id;
    const {
        nombre,
        email,
        password,
        direccion,
        telefono,
        pais,
        ciudad,
    } = req.body;

    let body = {};

    if (req.file) {
        const data = req.file.buffer;
        // const data = req.body.img; // Postman
        const contentType = req.file.mimetype;
        // const contentType = req.body.img.type; //Postman
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
        if (user.pais !== '')
            body['pais'] = user.pais;
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
        if (user.pais !== '')
            body['pais'] = user.pais;
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
        const resp = await User.findOne({ _id }, { img: 1 });
        // console.log(resp.img[0].contentType)
        const img = resp.img.find((file) => file.name === name);
        res.set('Content-Type', img.contentType);
        res.send(img.data);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};