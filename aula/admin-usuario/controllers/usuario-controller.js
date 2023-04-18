var usuarios = [];

const novoUsuario = (username, senha) => {
    usuarios[username] = {
        username: username,
        senha: senha,
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
        return usuarios[username].senha === senha;
    } else {
        return false;
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