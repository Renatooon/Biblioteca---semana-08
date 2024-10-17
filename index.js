import express from 'express';
import { engine } from 'express-handlebars';
import connectDB from './db.js'; 
import Libro from './models/Libro.js'; 
import Usuario from './models/usuario.js'; 
import Ejemplar from './models/ejemplar.js'; 
import { formatDate } from './helpers.js'; 

const app = express();

connectDB();

app.engine('hbs', engine({
    extname: '.hbs',
    helpers: { 
        formatDate
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación de gestión de préstamos de libros');
});

app.get('/usuarios/list', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.render('usuarios/list', { usuarios });
    } catch (err) {
        console.error('Error al obtener los usuarios:', err);
        res.status(500).send('Error al obtener los usuarios');
    }
});

app.get('/usuarios/add', (req, res) => {
    res.render('usuarios/add');
});

app.post('/usuarios/add', async (req, res) => {
    try {
        const totalUsuarios = await Usuario.countDocuments();
        const nuevoUsuario = new Usuario({
            ...req.body,
            id_usuario: totalUsuarios + 1 // Genera un id secuencial
        });
        await nuevoUsuario.save();
        res.redirect('/usuarios/list');
    } catch (err) {
        console.error('Error al añadir el usuario:', err);
        res.status(500).send('Error al añadir el usuario');
    }
});

app.get('/usuarios/edit/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        res.render('usuarios/edit', { usuario });
    } catch (err) {
        console.error('Error al obtener el usuario para editar:', err);
        res.status(500).send('Error al obtener el usuario para editar');
    }
});

app.post('/usuarios/edit/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/usuarios/list');
    } catch (err) {
        console.error('Error al actualizar el usuario:', err);
        res.status(500).send('Error al actualizar el usuario');
    }
});

app.post('/usuarios/delete/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.redirect('/usuarios/list');
    } catch (err) {
        console.error('Error al eliminar el usuario:', err);
        res.status(500).send('Error al eliminar el usuario');
    }
});

app.get('/ejemplares/list', async (req, res) => {
    try {
        const ejemplares = await Ejemplar.find().populate('id_libro');
        res.render('ejemplares/list', { ejemplares });
    } catch (err) {
        console.error('Error al obtener los ejemplares:', err);
        res.status(500).send('Error al obtener los ejemplares');
    }
});

app.get('/ejemplares/add', async (req, res) => {
    try {
        const libros = await Libro.find(); 
        res.render('ejemplares/add', { libros }); 
    } catch (err) {
        console.error('Error al obtener los libros:', err);
        res.status(500).send('Error al obtener los libros');
    }
});

app.post('/ejemplares/add', async (req, res) => {
    try {
        const totalEjemplares = await Ejemplar.countDocuments();
        const nuevoEjemplar = new Ejemplar({
            ...req.body,
            id_ejemplar: totalEjemplares + 1,
            id_libro: req.body.id_libro 
        });
        await nuevoEjemplar.save();
        res.redirect('/ejemplares/list');
    } catch (err) {
        console.error('Error al añadir el ejemplar:', err);
        res.status(500).send('Error al añadir el ejemplar');
    }
});

app.get('/ejemplares/edit/:id', async (req, res) => {
    try {
        const ejemplar = await Ejemplar.findById(req.params.id).populate('id_libro');
        res.render('ejemplares/edit', { ejemplar });
    } catch (err) {
        console.error('Error al obtener el ejemplar para editar:', err);
        res.status(500).send('Error al obtener el ejemplar para editar');
    }
});

app.post('/ejemplares/edit/:id', async (req, res) => {
    try {
        await Ejemplar.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/ejemplares/list');
    } catch (err) {
        console.error('Error al actualizar el ejemplar:', err);
        res.status(500).send('Error al actualizar el ejemplar');
    }
});

app.post('/ejemplares/delete/:id', async (req, res) => {
    try {
        await Ejemplar.findByIdAndDelete(req.params.id);
        res.redirect('/ejemplares/list');
    } catch (err) {
        console.error('Error al eliminar el ejemplar:', err);
        res.status(500).send('Error al eliminar el ejemplar');
    }
});

app.get('/libros/list', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.render('libros/list', { libros });
    } catch (err) {
        console.error('Error al obtener los libros:', err);
        res.status(500).send('Error al obtener los libros');
    }
});

app.get('/libros/add', (req, res) => {
    res.render('libros/add');
});

app.post('/libros/add', async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.redirect('/libros/list');
    } catch (err) {
        console.error('Error al añadir el libro:', err);
        res.status(500).send('Error al añadir el libro');
    }
});

app.get('/libros/edit/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        res.render('libros/edit', { libro });
    } catch (err) {
        console.error('Error al obtener el libro para editar:', err);
        res.status(500).send('Error al obtener el libro para editar');
    }
});

app.post('/libros/edit/:id', async (req, res) => {
    try {
        await Libro.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/libros/list');
    } catch (err) {
        console.error('Error al actualizar el libro:', err);
        res.status(500).send('Error al actualizar el libro');
    }
});

app.post('/libros/delete/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.redirect('/libros/list');
    } catch (err) {
        console.error('Error al eliminar el libro:', err);
        res.status(500).send('Error al eliminar el libro');
    }
});

app.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});
