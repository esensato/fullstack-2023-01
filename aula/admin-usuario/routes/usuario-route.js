const express = require('express');
//npm install --save body-parser
const bodyParser = require('body-parser');
const usuarioController = require("../controllers/usuario-controller");
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();

// habilita o tratamento de requisições no formato JSON
router.use(bodyParser.json())

// cria um novo usuario
router.post('/usuario', (req, res) => {
    const novo = usuarioController.novoUsuario(req.body.username, req.body.senha);
    res.json({resultado: 'Usuário criado!', usuario: novo});
})

// Validar o login e senha
router.post('/usuario/login/', (req, res) => {
    const login = usuarioController.login(req.body.username, req.body.senha);
    if (login.valido) {
        res.json(login);
    } else res.status(401).json(login);
});

// Alterar a senha de um usuário
router.put('/usuario/novasenha', (req, res) => {

    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader.split(" ")[1]
    let decodificado;
    try {
        decodificado = jsonwebtoken.verify(token, process.env.SEGREDO);
    } catch (err) {
        res.status(400).json({resultado: 'Problemas para alterar a senha'});
        return;
    }
    const novaSenha = req.body.senha;
    console.log(decodificado)
    if (usuarioController.alterarSenha(decodificado.username, novaSenha)) {
        res.json({resultado: 'Senha alterada com sucesso!'});
    } else res.status(400).json({resultado: 'Problemas para alterar a senha'});
})

module.exports = router;

