## Nodejs Express

- *Javascript*: ambiente de execução é o *Browser*
- Nodejs: ambiente de execução é o sistema operacional
- Nem todas as bibliotecas, frameworks e funções estão disponíveis no Nodejs como `alert`, `DOM`, etc...
- Porém algumas operações somente são possíveis com o node, por exemplo, manipulação de arquivos.
- npm (Node Package Manager): gerenciador de pacotes
- node: runtime de execução

### Executando runtime

```bash
node
console.log('Teste');
.exit
```

### Acessando Arquivos

```javascript
const fs = require('fs');
fs.writeFileSync('arquivo.txt', 'Teste 123');
```

### Iniciando um Projeto

- Criar uma pasta do projeto
- Acessar a pasta (`cd nome_pasta`)
- Iniciar o projeto (`npm init -y`)

### Scripts de Execução
```json
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

```javascript
var http = require('http');

http.createServer(function (req, res) {
  console.log(JSON.stringify(req.headers))
  console.log(req.method);
  console.log(req.url);
  res.write('Hello World!');
  res.end();
}).listen(3000);
```

- Processando uma requisição POST

```javascript
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

- Obs: caso não seja localizado, executar (Windows):

`node node_modules\nodemon\bin\nodemon.js`

### Iniciando o Servidor

```javascript
const express = require('express');

const app = express();

app.listen(3000, () => console.log("Servidor iniciado!"))
```

### Mode de DEBUG
- Para ativar o modo de depuração com mensagens detalhadas sobre a execução do **express** basta definir uma variável de ambiente:
  - `export DEBUG=express:*` (mac / linux)
  - `set DEBUG=express:*` (windows)
 
### Middleware

- *Middleware* são bibliotecas que podem ser executadas a cada requisição ao servidor para realizar algum tipo de processamento sobre os valores de entrada e produzir desejados na saída

- Para aplicar um *middleware* basta utilizar o `use`

```javascript
app.use((req, res, next) => {

    res.send("Teste ok!");

});
```

- Observar que `req` representa a requisição do usuário (entrada) e `res` a resposta (saída)

### Usando o Next

- O *next* salta para a próxima unidade de processamento sem gerar resposta ao usuário

```javascript
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
### Verbos HTTP
- O protocolo HTTP prevê várias ações (verbos) requisitadas entre o cliente e o servidor
  - **GET** - quando queremos obter um recurso: `GET /filme/123` (obter o filme com id 123)
  - **POST** - para criar um novo recurso (os dados são enviados no corpo da requisição)
  - **PUT** - alterar um recurso: `PUT /filme/123` (atualizar o filme com o id 123 com os dados enviados no corpo da requisição)
  - **DELETE** - remover um recurso do servidor: `DELETE /filme/123` (remover o filme com id 123)

### Mapeando Requisições GET

  ```javascript
  const express = require('express');

  const app = express();

  app.get("/frase", (req, res, next) => {

      res.send("Boa noite !");

  });

  app.listen(3000, () => console.log("Servidor iniciado!"))
  ```
- Obs: pode-se utilizar um "*" para mapear qualquer rota que não se enquadre nas mapeadas:
  ```javascript
  app.get("*", (req, res, next) => {

      res.send("Requisição inválida");

  });
  ```
### Lendo Parâmetros da URL

- Pelos parâmetros passados na URL após o "?"
```javascript
app.get("/filme", (req, res) => {
    console.log(req.query)
    res.send(req.query);
});

```
- Criando parâmetros posicionais
```javascript
app.get("/filme/:id", (req, res) => {
    console.log(req.params.id)
    res.send(req.params.id);
});

```

### Mapeando Requisições POST

- Alterar o código para retornar um formulário `from` contendo `username` e `senha`

```javascript
app.get("/", (req, res, next) => {

    res.send('<form method="POST" action="login">Username:<input type="text" name="username">Senha:<input type="password" name="senha"><button type="submit>Login</button>');

});
```

- Requisições `POST` enviam os dados no corpo da mensagem HTTP

- O corpo da mensagem pode ser de vários tipos, incluindo formulários e objetos JSON

- Para manipular o corpo das mensagens [body-parser](https://expressjs.com/en/resources/middleware/body-parser.html) de modo mais fácil utilizar um novo módulo:

`npm install --save body-parser  --loglevel=error`

```javascript
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

```

- Outos tipos de requisições HTTP: `delete` (excluir algo), `put` (alterar algo)
***
### Retornando Objetos JSON

- *Express* oferece um método prático para converter dados para objetos JSON

```javascript
app.get("/json", (req, res, next) => {

    res.json({mensagem: 'Hello'});

});
```
***
### Tratamento de Erros

- **HTTP** possui uma série de códigos de erro que podem ser mapeados para o **RESTFul**
- [HTTP Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- Esses códigos podem ser utilizados, por exemplo:
  - 200 - requisição e resposta realizados com sucesso
  - 404 - recursos não localizado (por exemplo, em uma busca por id)
  - 401 - usuário não atuorizado a realizar a operação
  - 400 - requisição mal formulada (por exemplo, falta de um parâmetro)
- Em **express** o código de erro pode ser enviado por meio da função `status`
`res.status(401).send('Usuário ou senha inválidos!');`
***
### Arquivos Estáticos
- É possível mapear uma pasta para retornar arquivos estáticos como imagens, por exemplo
  `app.use(express.static('./publico'))`
- Todo arquivo dentro do diretório `publico` poderá ser acessado via requisição

### Cookies
- Para trabalhar com cookies 
`npm install --save cookie-parser`

  ```javascript
  const cookieParser = require('cookie-parser');
  app.use(cookieParser)
  app.get("/cookie", (req, res, next) => {
      console.log(req.cookies);
      res.cookie('name', 'express');
      res.send('cookie set'); 
  })
  ```
***
### Sessions

`npm install --save express-session`

```javascript
var session = require('express-session');
app.use(session());
app.get('/contador', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("Total " + req.session.page_views);
   } else {
      req.session.page_views = 1;
      res.send("Bem vindo! Primeiro acesso!!!");
   }
});
```
***
### Upload de Arquivos

- Instalar o pacote **fileupload**
`npm install --save express-fileupload`
- Criar uma página estática **HTML** dentro do diretório definido como público
  ```HTML
  <!DOCTYPE html>
  <html>
    <head>
      <title>Upload de Arquivo</title>
    </head>
    <body>
      <h1>Selecione o arquivo</h1>
      <form method="POST" action="/upload" enctype="multipart/form-data">
        <input type="file" name="arquivo" />
        <input type="submit" />
      </form>
    </body>
  </html>
  ```

- Efetuar as importações necessárias
  ```
  const fileUpload = require("express-fileupload");
  const path = require("path");
  ```
- Iniciar o **middleware**
`app.use(fileUpload());`
- Código para efetuar o upload e mover o arquivo para uma pasta:

  ```javascript
  app.post("/upload", (req, res) => {
      if (!req.files) {
          return res.status(400).send("Nenhum arquivo para upload.");
        }
      
      const file = req.files.arquivo;

      // __dirname representa o diretório atual
      const path = __dirname + "/files/" + file.name;
          // mv move um arquivo de diretório
          file.mv(path, (err) => {
              if (err) {
                return res.status(500).send(err);
              }
              return res.send({ status: "Sucesso!!!", path: path });
          });
    });
  ```
***
### Rotas

- Uma forma de organiar os vários tipos de requisições por objeto de negócio é a criação de rotas
- O objeto `Router()` implementa o conceito de rotas no *express*
- Criar uma pasta `routes` no projeto
- Dentro desta pasta, criar os arquivos (`js`) de rota para cada objeto de negócio
  ```javascript
  const express = require('express');

  const router = express.Router();

  router.get('/aluno/notas', (req, res, next) => {
      res.json({nota: 10.0});
  })

  module.exports = router;
  ```

  - Para registrar a rota na aplicação principal

    ```javascript
    const alunoRouter = require("./routes/aluno-route");
    app.use(alunoRouter)
  ```
  - Outra opção

    `app.use('/api/v1', alunoRouter)`
***
### Exercício
- Para o exercício abaixo não é necessário implementar a camada de persistência
- Utilizar uma estrutura de **hashmap** para armazenar os dados. Exemplo:
  ```javascript
  var usuarios = [];
  usuarios['joao'] = {username: 'joao', 
                      senha: '123', 
                      totalfalhalogin: 0, 
                      admin: false, 
                      bloqueado: false};
  // exemplo para trocar a senha
  usuarios['joao'].senha='teste123'
  console.log(usuarios);
  console.log(usuarios['joao'].username);
  console.log(usuarios['joao'].senha);
  ```
- Opcional - utilizar o [glitch](https://glitch.com/) para desenvolver os endpoints
- Implementar uma funcionalidade de gestão de usuários contemplando:
    - Possibilidade de criar um novo usuário contendo nome, username e senha
    - Validar o login e senha
    - Permitir a alteração da senha
    - Gravar um histórico de acessos do usuário contendo a data de login e um indicador (true / false) se a senha foi digitada corretamente
    ```javascript
    var acessos = [];
    acessos.push({usuario: 'joao', data: new Date(), valido: true})
    console.log(acessos)
    ```
    - Bloquear o usuário caso o total de logins com falha seja maior ou igual a 3
    - Implementar uma funcionalidade que permita o desbloqueio de um usuário por um usuário do tipo administrador
***
### Documentando Endpoints

[Open API](https://swagger.io/specification/)

[Swagger Editor](https://editor.swagger.io/)

- Exemplo:

```yaml
openapi: 3.0.9
info:
  title: Meus Endpoints
  version: '1.0'
servers:
  - url: http://localhost:9000
components:
  schemas:
    Filme:
      type: object
      properties:
        id:
          type: string
        titulo:
          type: string
paths:
  /cinema/filme:
    post:
      operationId: criarFilme
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Filme'
      responses:
        '200':
          description: Filme criado com sucesso!
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
```
***
#### Criptografando Senhas
- Uma das opções é utilizar o módulo `bcryptjs`
- `npm install --save bcryptjs`
- Para criptografar e comparar:

```javascript
const bcryptjs = require('bcryptjs');

const hash = bcryptjs.hashSync("teste", 12);
console.log(hash);
console.log(bcryptjs.compareSync("teste", hash));
console.log(bcryptjs.compareSync("teste2", hash)) 
```
- Melhorar a parte de login acima implementando criptografia
***
#### JWT (JSON Web Token)

- [Especificação](https://jwt.io/)
- Funcionamento básico:
  - Usuário se autentica
  - Se autenticação válida, gera um **token**
  - Próximas requisições enviam o **token** no *header* da requisição
- Instalação
`npm install --save jsonwebtoken`
- Exemplo
  ```javascript
  const jwt = require('jsonwebtoken');
  // criar a variável de ambiente SECRET com a chave secreata
  const token = jwt.sign({username: 'teste', emal: 'teste@teste.com'}, process.env.SECRET, { expiresIn: '1800s' });
  console.log(token);
  const decoded = jwt.verify(token, process.env.SECRET);
  console.log(decoded);
  ```
- Recebendo a requisição no *header*
  ```javascript
  const authHeader = req.headers["authorization"]
  const token = authHeader.split(" ")[1]
  ``` 
***
#### Express Validator
- Framework para validação de dados disponível no **Express** - [Site Validator](https://express-validator.github.io)
- Instalação

`npm install --save express-validator`
- Importar o tipo de validação `body`, `query` ou `param`

`const { body, validationResult, matchedData } = require('express-validator');`
- Para efetuar as validações:
  ```javascript
    router.post('/usuario/login/', body('username').notEmpty().isEmail().withMessage('E-mail invalido!'), body('senha').isNumeric(), (req, res) => {
      let validacao = validationResult(req).array();
      if (validacao.length === 0) {
        // dados validados
        const data = matchedData(req);
        if (usuarioController.login(data.username, data.senha)) {
            res.json({resultado: 'Login OK!'});
        } else res.status(401).json({resultado: 'Usuário / senha inválidos!'});
      } else {
        res.status(401).json(validacao);
      }
  });
  ```
***
#### Lidando Com Endpoints Inexistentes (404)
- Adicionar como último *endpoint*
```javascript
// 404 error
app.use((req, res) => {
  res.status(404).json({msg: "Endpoint inválido!"});
});
```
***
#### Conectando MongoDB com Express via Mongoose
- Instalar o `mongoose`

  `npm install --save mongoose`
- Código exemplo que deve ser criado no arquivo principal:
  ```javascript
  const mongoose = require('mongoose');
  const express = require('express');

  const app = express();

  mongoose.connect(URL)
          .then(() => {
            app.listen(3000, () => console.log("Servidor iniciado!"))
          })
          .catch (err => console.log(err);
  ```
- Implementar a criação de usuário com conexão com o **mongodb**