import React from 'react';
import './DesenhaLista.css';

const DesenhaLista = (props) => {
    return (<>
        <div className='titulo'>{props.children}</div>
        <ul>
            { props.itens.map((item) => 
                <li onClick={props.selecionarItemCallback.bind(this,item)} 
                    key={item}>{item}</li>) 
            }
        </ul>
        </>);
}

export default DesenhaLista;