## Frontend com React
- React é uma biblioteca *javascript* baseada em componentes
- Utilizado para criação de interface com usuário (*frontend*)
- Usa **JSX** (*Javascript XML*) para renderizar componentes
***
## React no Navegador
- [Site React](https://react.dev/)
- Basta importar as bibliotecas do `React`
    ```html
    <html>
        <header>
            <script src="https://fb.me/react-0.14.3.js"></script>
            <script src="https://fb.me/react-dom-0.14.3.js"></script>
        </header>
        <body>
        </body>
    </html>
    ```
- Criar um `<div>` com um **id** **root** onde a interface será exibida
    ```javascript
    <html>
        <header>
            <script src="https://fb.me/react-0.14.3.js"></script>
            <script src="https://fb.me/react-dom-0.14.3.js"></script>
        </header>
        <body>
            <div id="root"></div>
        </body>

    </html>
    ```
- Criar o elemento HTML desejado e exibi-lo utilizando as funções do React
    ```javascript
    <script>
        const container = document.getElementById('root');
        const btn = React.createElement('button', {onClick: () => alert('Teste ok')}, 'Teste React')
        ReactDOM.render(btn, container)
    </script>
    ```
***
## Criando um Projeto
- Utilizar o utilitário **create-react-app** seguido pelo nome do projeto

    `npx create-react-app lista-compras`

- Acessar a pasta do projeto

    `cd lista-compras`

- Iniciar o servidor

    `npm start`

- Editar o arquivo `index.js` dentro de `src`:

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <h1>Funcionou!</h1>
    </React.StrictMode>
    );
    ```
- Visualizar o código fonte da página no navegador
***
## JSX
- Permite utilizar *tags* (selelhantes ao HTML) dentro do código React
- Reside na biblioteca `react`

    `import React from 'react';`
- As referências às classes CSS devem ser feitas pelo atributo `className` (ao invés de `class` do HTML)
- Podem ser definidas condicionais utilizando `&&`

    `{ isAluno && <h1>Aluno</h1> }`
    `{ !isAluno && <h1>Professor</h1> }`
- Condicionais também podem ser aplicadas:

    `{ isAluno ? <h1>Aluno</h1> : <h1>Professor</h1> }`
- Valores em listas

    ```javascript
    const itens = ['Calça', 'Camisa', 'Meias'];

    const listItems = itens.map(item => <li key={item}>{item}</li>);

    <ul>{listItems}</ul>
    ```
***
## Componentes
- React é baseado fortemente em componentes
- Deve-se pensar no projeto do *frontend* como uma composição de componentes menores, coesos e não acoplados
***
## Componente Lista
- Criar uma pasta `lista` dentro de `src`
- Criar dois arquivos: `lista.js` e `lista.css`
    ```javascript
    import React from 'react';
    import './lista.css';

    const Lista = () => {
        return <ul>
            <li>Feijão</li>
            <li>Arroz</li>
            <li>Farofa</li>
        </ul>
    }

    export default Lista;
    ```
- Alterar o `index.js`

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import Lista from './lista/lista';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <Lista />
    </React.StrictMode>
    );
    ```
- Ajustanto o `lista.css`
    ```css
    ul {
        list-style: none;
        width: 300px;
        text-align: center;
        margin-right: auto;
        margin-left: auto;
    }

    li {
        border: solid 1px;
        padding: 5px;
        margin: 3px;
    }
    ```
## Propriedades
- Forma de parametrizar os componentes
- Por exemplo, a lista de produtos deve ser passada como parâmetros para a lista
- Para isso utilizamos a propriedade `props`
    ```javascript
    const Lista = (props) => {
        return <ul>
            { props.itens.map((item) => <li key={item}>{item}</li>) }
        </ul>
    }
    ```
- Agora a lista pode ser passada como parâmetro:
    ```javascript
    const minhalista = ["Arroz", "Feijão", "Macarrão"];

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <Lista itens={minhalista}/>
    </React.StrictMode>
    );
    ```
## Eventos
- Podem ser associados aos componentes relacionando uma função como responsta ao evento
    ```javascript
    const Lista = (props) => { 
        return <ul>
            { props.itens.map((item) => <li onClick={() => alert(item)} key={item}>{item}</li>) }
        </ul>
    }
    ```
## Callbacks
- Um componente se comunica com outros por meio da chamada "reversa" de funções (*callback*)
- Funções também podem ser passadas como parâmetros nas `props`
    ```javascript
    const Lista = (props) => {
        
        return <ul>
            { props.itens.map((item) => <li onClick={() => props.onItemSelecionado(item)} key={item}>{item}</li>) }
        </ul>
    }
    ```
- Ao acionar o componente a função *callback* é passada como parâmetro
    ```javascript
    const minhalista = ["Arroz", "Feijão", "Macarrão"];

    const itemSelecionado = (item) => {
    alert(item);
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <Lista itens={minhalista} onItemSelecionado={itemSelecionado}/>
    </React.StrictMode>
    );
    ```
## Gerenciamento de Estado
- Criar um novo componente para permitir a inserção de novos itens na lista
- Cria uma pasta `formulario`
    ```javascript
    import React from 'react';
    import './formulario.css';

    const Formulario = (props) => {

        const enviar = (event) => {
            // impede que seja feito um request ao servidor
            event.preventDefault();
        }

        return <form onSubmit={enviar}>
        <label>
        Novo Item:
        <input type="text" name="item" />
        </label>
        <input type="submit" value="Inserir" />
    </form>
    }

    export default Formulario;
    ```
- Estilo:
    ```css
    form {
        text-align: center;
        margin: 10px;
    }
    ```
- Para que o valor do campo texto seja atualizado enquanto digitamos é necessário utilizar o *two-way binding*
- Quando a atualização do valor de uma variável deve ser refletiva na interface, então é necessário encapsulá-la em um *state*
- Por exemplo, a variável `texto` abaixo somente terá seu valor exibido na interface uma única vez
- Mesmo que atualizada no componente, o novo valor não poderá ser visto
    ```javascript
    const texto = "Valor digitado"

    return <form onSubmit={enviar}>
    <label>
    Novo Item:
    <input type="text" name="item" value={texto} />
    </label>
    <input type="submit" value="Inserir" />
    </form>
    ```
- Sendo assim ele deve ser colocado em um `useState`
    ```javascript
    const [texto, novoTexto] = useState("");
    ```
- `useState` retorna uma variável somente leitura e uma função de escrita na variável
    ```javascript
    import { useState } from 'react';
    ```
- Implementar uma função que irá receber o texto digitado e atualizar o estado da variável `texto`
    ```javascript
    const [texto, novoTexto] = useState("");

    const digitar = (event) => {
        novoTexto(event.target.value);
    }
    ```
- Atualizar o texto conforme digitado
    ```javascript
    <input type="text" name="item" value={texto} onChange={digitar}/>
    ```
- Complementar a função `enviar` para acionar uma função *callback* para processar o texto digitado
    ```javascript
    const enviar = (event) => {
        // impede que seja feito um request ao servidor
        event.preventDefault();
        // aciona o callback passando o texto do item digitado
        props.onSubmit(texto);
    }
    ```
- Criar no `index.js` a função que irá processar o novo item informado
    ```javascript
    const adicionarItem = (item) => {
    alert(item);
    }
    ```
- Passar o *callback* como parâmetro para o componente `Formulario`
    ```javascript
    <Formulario onSubmit={adicionarItem}/>
    ```
- Até o momento, `index.js` deve estar assim:
    ```javascript
    const minhalista = ["Arroz", "Feijão", "Macarrão"];

    const itemSelecionado = (item) => {
    alert(item);
    }

    const adicionarItem = (item) => {
    alert(item);
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <Formulario onSubmit={adicionarItem}/>
        <Lista itens={minhalista} onItemSelecionado={itemSelecionado}/>
    </React.StrictMode>
    );
    ```
## Exercício
- Complementar a aplicação para inserir o novo item informado na lista
- Apagar o texto inserido para o novo item quando submeter o formulário

## Reestrurando a Aplicação
- Criar um novo componente `Principal` em um arquivo `principal.js`
    ```javascript
    import Formulario from "../formulario/formulario";
    import Lista from "../lista/lista";

    const Principal = (props) => {
        const minhalista = ["Arroz", "Feijão", "Macarrão"];

        const itemSelecionado = (item) => {
        alert(item);
        }

        const adicionarItem = (item) => {
        alert(item);
        }

        return <div>
        <Formulario onSubmit={adicionarItem}/>
        <Lista itens={minhalista} onItemSelecionado={itemSelecionado}/>
        </div>
    }

    export default Principal;
    ```
- Criar um componente `Login` conforme abaixo
    ```javascript
    import React from 'react';

    const Login = (props) => {
        
        return <h1>Login</h1>
    }

    export default Login;
    ```
## Rotas
- Rotas permitem implementar navegação entre os componentes e páginas
- Adicionar ao projeto
`npm install --save react-router-dom`
- Alterar o `index.js` para importar os componentes que implementam rotas
```javascript
import { createBrowserRouter, RouterProvider } from "react-router-dom";
```
- Adicionar as rotas
    ```javascript
    const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/principal",
        element: <Principal />
    }
    ]);
    ```
- Instanciar as rotas
    ```javascript
    root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
    );
    ```
- Para acessar as rotas
`http://localhost:3000/`
`http://localhost:3000/principal`
## Exercício
- Implementar o componente de **Login**
## Redirecionando
- Utilizar o *hook* `useNavigate` para efetuar a navegação entre os componentes
    `import { useNavigate } from 'react-router-dom';`
- Alterar o componente **Login** para direcionar para o `/principal`
    ```javascript
    const navigate = useNavigate();

    const enviar = (event) => {
        // impede que seja feito um request ao servidor
        event.preventDefault();
        navigate("/principal");	
    }
    ```
## Links
- Para navegação utilizando *links*
    ```javascript
    <Link to="/principal">Principal</Link>
    <Link to="/">Login</Link>
    ```
## Parâmetros
- Parâmetros dinâmicos podem ser passados na definição das rotas
- Por exemplo, ao efetuar o login o *username* pode ser passado (opcionalmente) como parâmetro

    `http://localhost:3000/user1`
- Neste caso, basta alterar a regra de roteamento incluindo `:pusername` (o `?` indica que o parâmetro é opcional):
    ```javascript
    const router = createBrowserRouter([
    {
        path: "/:pusername?",
        element: <Login />,
    },
    {
        path: "/principal",
        element: <Principal />,
    },
    ]);
    ```
- Para ler o parâmetro (em `login.js`) deve-se importar o *hook* `useParam`

    `import { useParams } from 'react-router-dom';`
- Depois instanciar e definir os parâmetros a serem lidos (no caso `pusername`)

    `const { pusername } = useParams();`
- Atualizar o `useState`

    `const [username, novoUsername] = useState(pusername ? pusername : "");`
- Quando parâmetros são passados via *query* na URL então utilizar `useSearchParams`

    ```javascript
    import { useSearchParams } from "react-router-dom";
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams);
    ```
- Por exemplo, o novo gasto pode ser passado como parâmetro via URL

    `http://localhost:3000/principal?item=Refigerante`

## Componente de Navegação
- Para criar menus de navegação uma opção é criar um componente que encapsula um `NavLink`
    ```javascript
    import { NavLink } from `react-router-dom`;

    function Navigation() {
    return(
        <NavLink 
        to="/home" 
        className={ ({ isActive }) => isActive ? 'active-navlink': ''}>
        Home
        </NavLink>
    );
    }

    export default Navigation;
    ```