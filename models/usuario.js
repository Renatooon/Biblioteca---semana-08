import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    id_usuario: { type: Number, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    rol: { type: String, required: true },
    fecha_registro: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;
