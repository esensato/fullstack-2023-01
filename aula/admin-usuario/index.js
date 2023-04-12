const express = require('express');
const usuarioRoute = require('./routes/usuario-route')

const app = express();

// habilita a rota para usuarios
app.use(usuarioRoute);

app.post('/alo', (req, res) => {
    res.send('Ola');
})

app.listen(3000, () => console.log('Servidor iniciado...'));