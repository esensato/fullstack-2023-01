const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const uploadRoute = require('./routes/upload');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat'}));
app.use(express.static('./img'));

app.use(uploadRoute);

app.get("/contador", (req, res) => {
    if(req.session.page_views){
        req.session.page_views++;
        res.send("Total " + req.session.page_views);
     } else {
        req.session.page_views = 1;
        res.send("Bem vindo! Primeiro acesso!!!");
     }
})

app.get("/form", (req, res, next) => {
    if (req.cookies.username != null) {
        res.send('Login OK!!!');
    } else {
        // POST em http://localhost:9000/login
        res.send('<form method="POST" action="login">Username:<input type="text" name="username">Senha:<input type="password" name="senha"><button type="submit">Login</button>');
    }
});

app.post("/login", (req, res) => {
    console.log(req.cookies);
    console.log(req.body.username);
    console.log(req.body.senha);

    if (req.cookies.username != null || 
        (req.body.username === 'teste' && req.body.senha === '123')) {
        res.cookie('username', req.body.username);
        res.status(200).send('Login OK!!!!');
    } else {
        res.status(401).json({erro: 'Username ou senha invalidos!'});
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

app.listen(9000, ()=>{
    console.log('Servidor iniciado!');
})