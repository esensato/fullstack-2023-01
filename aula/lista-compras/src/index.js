import React from 'react';
import ReactDOM from 'react-dom/client';
import FormLista from './form-lista/FormLista';
import './index.css';
import DesenhaLista from './lista/DesenhaLista';
import { useState } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Principal = () => {
  const itemSelecionado = (item) => console.log(item);

  const [lista, addLista] = useState([]);
  
  const adicionarItem = (item) => {
    addLista([...lista, item]);
  }

  return  <React.StrictMode>
              <FormLista adicionarCallback={adicionarItem}/>
              <DesenhaLista 
                itens={lista}
                selecionarItemCallback={itemSelecionado}>Lista Compras</DesenhaLista>
          </React.StrictMode>
}

root.render(<Principal />);
