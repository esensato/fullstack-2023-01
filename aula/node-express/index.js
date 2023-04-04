const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get("/form", (req, res, next) => {
    // POST em http://localhost:9000/login
    res.send('<form method="POST" action="login">Username:<input type="text" name="username">Senha:<input type="password" name="senha"><button type="submit">Login</button>');
});

app.post("/login", (req, res) => {
    if (req.body.username === 'teste' && req.body.senha === '123') {
        res.send('Login OK!!!!');
    } else {
        res.send('Username ou senha invalidos!');
    }
})

// http://localhost:9000/filme/123/2023
app.get("/cinema/filme/:id/:ano", (req, res) => {
    res.send(req.params.ano);
});

// http://localhost:9000/ator?nacionalidade=brasileira
app.get("/ator", (req, res) => {
    if (req.query.nacionalidade) {
        res.send(req.query.nacionalidade);        
    } else {
        res.send("Informar o parametro nacionalidade!");

    }
});

var msg = "";

app.use((req, res, next) => {

    msg = "Boa ";
    next();

});

app.use((req, res, next) => {
    msg += "Noite!"
    res.send("<h1>"+ msg + "</h1>");

});

app.listen(9000, ()=>{
    console.log('Servidor iniciado!');
})