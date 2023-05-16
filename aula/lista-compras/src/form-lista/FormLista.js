import React from 'react';
import './FormLista.css';
import { useState } from 'react';


const FormLista = (props) => {

    const [totalItens, setTotalItem] = useState(0);
    const [item, setItem] = useState("")
    
    const adicionar = (event) => {
        console.log(totalItens);
        event.preventDefault();
        props.adicionarCallback(item);
        setItem("");
        const novoTotal = totalItens + 1;
        setTotalItem(novoTotal);
    }
    const digitacao = (event) => {
        setItem(event.target.value);
    }

    let ret;
    if (totalItens > 5) {
        ret = <div></div>
    } else {
        ret = <>
        <form onSubmit={adicionar} >
            <label>Novo Item:</label>
            <input value={item} onChange={digitacao}/>
            <button>Adicionar</button>
        </form>
        <div>{totalItens}</div>
        </>
    }
    return  ret;
}

export default FormLista;