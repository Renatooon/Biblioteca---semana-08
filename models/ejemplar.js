import mongoose from 'mongoose';

const EjemplarSchema = new mongoose.Schema({
    id_ejemplar: { type: Number, required: true },
    id_libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
    fecha_adquisicion: { type: Date, required: true },
    estado: { type: String, required: true }
});

const Ejemplar = mongoose.model('Ejemplar', EjemplarSchema);
export default Ejemplar;
