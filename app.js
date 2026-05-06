const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const archivo = 'animales.json';

function leerDatos() {
    const data = fs.readFileSync(archivo);
    return JSON.parse(data);
}


function guardarDatos(data) {
    fs.writeFileSync(archivo, JSON.stringify(data, null, 2));
}


app.get('/animales', (req, res) => {
    const data = leerDatos();
    res.json(data);
});


app.post('/animales', (req, res) => {
    const data = leerDatos();
    const nuevo = req.body;
    nuevo.id = data.length + 1;
    data.push(nuevo);
    guardarDatos(data);
    res.json(nuevo);
});


app.put('/animales/:id', (req, res) => {
    const data = leerDatos();
    const id = parseInt(req.params.id);
    const nuevoNombre = req.body.nombre;

    const index = data.findIndex(a => a.id === id);

    if (index !== -1) {
        data[index].nombre = nuevoNombre;
        guardarDatos(data);
        res.json(data[index]);
    } else {
        res.status(404).json({ mensaje: "No encontrado" });
    }
});

// DELETE
app.delete('/animales/:id', (req, res) => {
    const data = leerDatos();
    const id = parseInt(req.params.id);

    const nuevaLista = data.filter(a => a.id !== id);

    guardarDatos(nuevaLista);

    res.json({ mensaje: "Eliminado correctamente" });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
