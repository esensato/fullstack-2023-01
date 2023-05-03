import React from 'react';
import './FormLista.css';
import { useState } from 'react';

const FormLista = (props) => {

    const [item, setItem] = useState("")

    const adicionar = (event) => {
        event.preventDefault();
        props.adicionarCallback(item);
    }
    const digitacao = (event) => {
        setItem(event.target.value);
    }

    return  <form onSubmit={adicionar}>
                <label>Novo Item:</label>
                <input value={item} onChange={digitacao}/>
                <button>Adicionar</button>
            </form>;
}

export default FormLista;