import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const usernameSchema = new Schema({
    nombre: { type: String, required: true, max: 40 },
    email: { type: String, required: true, max: 40 },
    password: { type: String, required: true, max: 40, select: false },
    pais: { type: String, required: true, max: 40 },
    ciudad: { type: String, required: true, max: 40 },
    direccion: { type: String, required: true, max: 40 },
    telefono: { type: String, required: true, max: 40 },
    avatar: { data: Buffer, contentType: String },
    rol: { type: String, required: true, max: 15 },
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
