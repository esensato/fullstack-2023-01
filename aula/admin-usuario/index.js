const express = require('express');
const mongoose = require('mongoose');
const usuarioRoute = require('./routes/usuario-route')

const app = express();

// habilita a rota para usuarios
app.use(usuarioRoute);

app.post('/alo', (req, res) => {
    res.send('Ola');
})

app.use((req, res) => {
    res.status(404).json({msg: "Endpoint inexistente!"})
})
const URL = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/admin-usuario?retryWrites=true&w=majority";

mongoose.connect(URL).then(() => {
    app.listen(3000, () => console.log('Servidor iniciado...'));
}).catch((err) => console.log(err));
