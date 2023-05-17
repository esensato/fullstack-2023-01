import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = (props) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");

    const login = async (event) => {
        event.preventDefault();

        const url = "https://controle-acesso.glitch.me/login";

        const body = {username: username, senha: senha};

        const param = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        const resposta = await fetch(url, param);
        if (resposta.status != 200) {
            navigate("/");
        } else  if (resposta.status === 200) {
            const respostaJson = await resposta.json();
            console.log(respostaJson);
            navigate("/cadastro/" + respostaJson.userId);    
        }
    }

    const atualizaUsername = (evt) => setUsername(evt.target.value)
    const atualizaSenha = (evt) => setSenha(evt.target.value)

    return <form onSubmit={login}>
        <label>
        Username:
        <input type="text" name="username" value={username} onChange={atualizaUsername}/>
        </label>
        <label>
        Senha:
        <input type="password" name="senha" value={senha} onChange={atualizaSenha}/>
        </label>
        <input type="submit" value="Login" />
    </form>
}