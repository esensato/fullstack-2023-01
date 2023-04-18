# fullstack-2023-01
Desenvolvimento Fullstack

### Instalação nodejs

### Upgrade nodejs

sudo npm install -g create-react-app@5.0.1
npx create-react-app hello-world
npm start

- Editar o arquivo `index.js` e remover a *tag* `<App />`
- Exibir o código fonte da página e verificar a estrutura do *html*
- Alterar o código conforme abaixo:
    ```javascript
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <h1>Teste</h1>
    </React.StrictMode>
    );
    ```
***
## Criando Componentes
- Criar uma pasta `components` dentro de `src`
- Criar o arquivo `lista-filmes.js` dentro de `components`
```javascript
export const ListaFilmes = () => {

    return <div>
                <ul>
                    <li>Batman o Retorno</li>
                    <li>Super Homem e o Grande Fim do Mundo</li>
                    <li>As Batalhas de Lanterna Verde</li>
                </ul>
            </div>
}
```
```css
ul {
    list-style: none;
}
li {
    margin: 5px;
    background-color: lightblue;
    padding: 5px;
}
```
- Importar o **css**
`import './lista-filmes.css'`

***
## Passando Propriedades para o Componente
- Todo componente pode receber parâmetros por meio de **props**
```javascript
export const ListaFilmes = (props) => {

    return <div>
                <ul>
                    { props.filme }
                </ul>
            </div>
}
```
```javascript
root.render(
  <React.StrictMode>
    <ListaFilmes filme="O Dia Perfeito para Nascer"/>
  </React.StrictMode>
);
```
- É possível também passar uma lista de valores como parâmetro
    ```javascript
    const filmes = [{titulo: "Batman Forever"}, {titulo: "Pânico em NY"}]
    root.render(
    <React.StrictMode>
        <ListaFilmes lista={filmes}/>
    </React.StrictMode>
    );
    ```
- Neste caso um ajuste no componente será necessário
```javascript
export const ListaFilmes = (props) => {
    return <div>
                <ul>
                    { props.lista.map((filme) => <li>{filme.titulo}</li>) }
                </ul>
            </div>
}
```
```javascript
export const ListaFilmes = (props) => {

    const [filmes, addFilme] = useState(props.lista);

    return <div>
                <ul>
                    { filmes.map((filme) => <li>{filme.titulo}</li>) }
                </ul>
            </div>
}
```