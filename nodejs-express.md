## Nodejs Express

- *Javascript*: ambiente de execução é o *Browser*
- Nodejs: ambiente de execução é o sistema operacional
- Nem todas as bibliotecas, frameworks e funções estão disponíveis no Nodejs como `alert`, `DOM`, etc...
- Porém algumas operações somente são possíveis com o node, por exemplo, manipulação de arquivos.
- npm (Node Package Manager): gerenciador de pacotes
- node: runtime de execução

### Executando runtime

```
node
console.log('Teste');
.exit
```

### Acessando Arquivos

```
const fs = require('fs');
fs.writeFileSync('arquivo.txt', 'Teste 123');
```

### Iniciando um Projeto

- Criar uma pasta do projeto
- Acessar a pasta (`cd nome_pasta`)
- Iniciar o projeto (`npm init -y`)

### Scripts de Execução
```
{
  "name": "teste-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"    
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

npm run test

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "version": "node -v"    

}

npm run version
```

### Servidor HTTP Padrão com Nodejs

- Utilizar o módulo padrão `http` (não precisa ser instalado)

```
var http = require('http');

http.createServer(function (req, res) {
  console.log(req.method);
  console.log(req.url);
  res.write('Hello World!');
  res.end();
}).listen(3000);
```

- Processando uma requisição POST

```
http.createServer(function (req, res) {
  console.log(req.method);
  let corpo = "";
  if (req.method === "POST") {
    req.on("data", (dados) => corpo += dados);
    req.on("end", () => console.log(corpo))
  }
  console.log(req.url);
  res.write('<form method="POST"><input type="text" name="usuario"><Button type="submit">Enviar</Button></form>');
  res.end();
}).listen(3000);
```
### Express

- O express é uma framework que encapsula muitas funcionalidades para o tratamento de requisições HTTP
- É ideal para implementar a camadas de serviços utilizando, por exemplo, o padrão RESTFul

### Instalação

`npm install express --save`

- Instalar também o `nodemon` apenas no ambiente de desenvolvimento
- O `nodemon` monitora automaticamente alterações no código do projeto e efetua o deploy automaticamente

`npm install nodemon --save-dev`

- Iniciar o `nodemon` (ele irá buscar pela propriedade `main` no `package.json`)

`nodemon`

### Iniciando o Servidor

```
const express = require('express');

const app = express();

app.listen(3000, () => console.log("Servidor iniciado!"))
```

### Middleware

- *Middleware* são bibliotecas que podem ser executadas a cada requisição ao servidor para realizar algum tipo de processamento sobre os valores de entrada e produzir desejados na saída

- Para aplicar um *middleware* basta utilizar o `use`

```
app.use((req, res, next) => {

    res.send("Teste ok!");

});
```

- Observar que `req` representa a requisição do usuário (entrada) e `res` a resposta (saída)

### Usando o Next

- O *next* salta para a próxima unidade de processamento sem gerar resposta ao usuário

```
const express = require('express');

const app = express();

let frase = "";

app.use((req, res, next) => {

    frase = "Boa"
    next();


});

app.use((req, res, next) => {

    frase += " "
    next();


});

app.use((req, res, next) => {

    frase += "Noite"
    next();

});

app.use((req, res, next) => {

    res.send(frase);

});

app.listen(3000, () => console.log("Servidor iniciado!"))
```

### Mapeando Requisições GET

```
const express = require('express');

const app = express();

app.get("/frase", (req, res, next) => {

    const nome = req.query.nome;

    console.log(req.params)
    res.send("Boa noite " + nome);

});

app.listen(3000, () => console.log("Servidor iniciado!"))
```

### Lendo Parâmetros da URL

```
const express = require('express');
const app = express();

app.get("/frase", (req, res, next) => {

    const nome = req.query.nome;

    console.log(req.params)
    res.send("Boa noite " + nome);

});

app.listen(3000, () => console.log("Servidor iniciado!"))
```

### Mapeando Requisições POST

- Alterar o código para retornar um formulário `from` contendo `username` e `senha`

```
app.get("/", (req, res, next) => {

    res.send('<form method="POST" action="login">Username:<input type="text" name="username">Senha:<input type="password" name="senha"><button type="submit>Login</button>');

});
```

- Requisições `POST` enviam os dados no corpo da mensagem HTTP

- O corpo da mensagem pode ser de vários tipos, incluindo formulários e objetos JSON

- Para manipular o corpo das mensagens [body-parser](https://expressjs.com/en/resources/middleware/body-parser.html) de modo mais fácil utilizar um novo módulo:

`npm install --save body-parser  --loglevel=error`

```
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

```

- Outos tipos de requisições HTTP: `delete` (excluir algo), `put` (alterar algo)

### Retornando Objetos JSON

- *Express* oferece um método prático para converter dados para objetos JSON

```
app.get("/json", (req, res, next) => {

    res.json({mensagem: 'Hello'});

});
```

### Rotas

- Uma forma de organiar os vários tipos de requisições por objeto de negócio é a criação de rotas
- O objeto `Router()` implementa o conceito de rotas no *express*
- Criar uma pasta `routes` no projeto
- Dentro desta pasta, criar os arquivos (`js`) de rota para cada objeto de negócio
  ```
  const express = require('express');

  const router = express.Router();

  router.get('/aluno/notas', (req, res, next) => {
      res.json({nota: 10.0});
  })

  module.exports = router;
  ```

  - Para registrar a rota na aplicação principal

    ```
    const alunoRouter = require("./routes/aluno-route");

    app.use(alunoRouter)
  ```
  - Outra opção

    `app.use('/api/v1', alunoRouter)`

  ### Exercício

  - Criar uma nota rota para exibir todas as disciplinas (`curso/disciplinas`) de um curso

