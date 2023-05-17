import React from 'react';
import FormLista from '../form-lista/FormLista';
import DesenhaLista from '../lista/DesenhaLista';
import { useState } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';

export const Cadastro = (props) => {

  const itemSelecionado = (item) => console.log(item);
  const [lista, addLista] = useState([]);
  const parametros = useParams();
  console.log(parametros);

  const adicionarItem = (item) => {
    addLista([...lista, item]);
  }

  return <>
              <div style={{margin: 30}}>
                <NavLink to="/" style={({isActive})=> isActive ? {background: 'red'} : {}}>Login</NavLink>
                <NavLink to="/cadastro/123" style={({isActive})=> isActive ? {background: 'red'} : {}}>Cadastro</NavLink>
                <NavLink to="/cadastro/555" style={({isActive})=> isActive ? {background: 'red'} : {}}>Novo Cadastro</NavLink>
              </div>             
              <div style={{margin: 30}}><Link to="/">Logout</Link></div>
              <div style={{margin: 30}}>UserId: {parametros.userid}</div>
              <FormLista adicionarCallback={adicionarItem}/>
              <DesenhaLista 
                itens={lista}
                selecionarItemCallback={itemSelecionado}>
                Lista Compras
              </DesenhaLista>
        </>

}
