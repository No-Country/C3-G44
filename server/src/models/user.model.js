import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const usernameSchema = new Schema({
    email: { type: String, required: true, max: 40 },
    password: { type: String, required: true, max: 40, select: false },
    nombreCompleto: { type: String, required: true, max: 40 },
    avatar: { data: Buffer, contentType: String },
    rol: { type: String, required: true, max: 15 },
    aboutme: { type: Array, required: false, max: 40 },
    service: { type: Array, required: false, max: 40 },
    recentproyects: { type: String, required: false, max: 40 },
    contacinfo: { type: String, required: false, max: 40 },
    imgProyects: [{ data: Buffer, contentType: String, name: String }],
}); // Pendiente definir campos de usuario

// Encrypta contraseña
usernameSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compara contraseña ingresada con base de datos
usernameSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Exportar modelo
export default model('users', usernameSchema);
