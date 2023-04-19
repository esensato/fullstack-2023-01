const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

var usuarios = [];

const novoUsuario = (username, senha) => {
    usuarios[username] = {
        username: username,
        senha: bcryptjs.hashSync(senha),
        bloqueado: false,
        totalFalhaLogin: 0,
        admin: false
    }
    return usuarios[username];
}

// criar uma função que valida usuario e senha
// retorna true caso username / senha válidos ou false caso contrário
const login = (username, senha) => {
    if (usuarios[username]) {
        const valido = bcryptjs.compareSync(senha, usuarios[username].senha);
        if (valido) {
            const token = jsonwebtoken.sign({username: username}, process.env.SEGREDO);
            return {valido: true, token: token};
        } else return {valido: false};
    } else {
        return {valido: false};
    }
}

// função que altera a senha de um usuario
const alterarSenha = (username, novaSenha) => {
    console.log(username, usuarios[username ])
    if (usuarios[username]) {
        usuarios[username].senha = novaSenha;
        return true;
    } else {
        return false;
    }
}

module.exports.novoUsuario = novoUsuario;
module.exports.login = login;
module.exports.alterarSenha = alterarSenha;