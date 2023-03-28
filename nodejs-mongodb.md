### Acesso

### Instalação Nodejs

[Download Nodejs](https://nodejs.org/en/download/)

### Atualização npm / nodejs

```
npm install -g npm@latest
npm -v
npm install -g n
n latest
node -v
```

### Criar um Projeto Nodejs

- Criar o diretório do projeto: `mkdir nodejs_mongodb`
- Acessar o diretório criado: `cd nodejs_mongodb`
- Iniciar o projeto Nodejs: `npm init -y`

### Mongodb Driver

- [Documentação Mongodb Nodejs Driver](https://www.mongodb.com/docs/drivers/node/current/)

- Instalação (executar dentro da pasta do projeto): `npm install --save mongodb`

### Obter URL de Conexão

- [Acessar o Atlas](https://www.mongodb.com/atlas/database)

![atlas-1](img/atlas-1.png)

![atlas-2](img/atlas-2.png)

![atlas-3](img/atlas-3.png)

### Código de Teste com Mongodb

- Importar a biblioteca `mongodb`

```
const { MongoClient } = require("mongodb");
```
- Definir a string de conexão e substituir `<password>` com a senha da instância do banco de dados criado no Atlas

```
const uri = "mongodb+srv://teste:<password>@cluster0.wnbdk2i.mongodb.net/?retryWrites=true&w=majority";

```
- Instanciar um cliente
```
const client = new MongoClient(uri);
```
- Criar uma função assíncrona:

```
async function runMongodb() {
  try {

    process.exit(0);

  } finally {

  }
}

runMongodb().catch(console.dir);

```
- Efetuar a conexão com o banco de dados `db` e obter a coleção `collection`
```
const pizzaria = client.db('pizzaria');
const pedidos = pizzaria.collection('pedidos');
```
- Sempre fechar a conexão:
```
await client.close();
```
- Criar um pedido:
```
const resultado = await pedidos.insertOne({pizza: "Marguerita", quantidade: 2, endereco: "Rua Z, 234"});
console.log(resultado);
```
- Localizar um pedido:

```
const pedido = await pedidos.findOne();
console.log(pedido);
```
- Atualizar um pedido pelo `Id`:
```
const { MongoClient, ObjectId } = require("mongodb");
const resultado = await pedidos.updateOne({_id: new ObjectId("63f901e76ea77a958cd09600")}, {$set: {quantidade: 3}});
console.log(resultado);
```
- Remover um pedido pelo `Id`:
```
const resultado = await pedidos.deleteOne({_id: new ObjectId("63f901e76ea77a958cd09600")});
console.log(resultado);
```
- Pesquisar mais do que um registro:
```
const resultado = await pedidos.find().toArray();
console.log(resultado);
```
- Outra forma:
```
const resultado = await pedidos.find();
await resultado.forEach((obj) => {
    console.log(obj.pizza, obj.quantidade, obj.endereco)
});
```
- Contando documentos
```
const resultado = await pedidos.countDocuments();
console.log(resultado);
```
### Mongoose Driver

- [Documentação Mongoose Nodejs Driver](https://mongoosejs.com/docs/index.html)

- Instalação (executar dentro da pasta do projeto): `npm install --save mongoose`

### Código de Teste com Mongoose

- Importar a biblioteca `mongoose`

```
const mongoose = require('mongoose');
```
- Definir a string de conexão e substituir `<password>` com a senha da instância do banco de dados criado no Atlas
- Definir o nome do banco de dados em `<nome_bd>`, por exemplo, pedidos

```
const uri = "mongodb+srv://teste:<password>@cluster0.wnbdk2i.mongodb.net/<nome_bd>?retryWrites=true&w=majority";

```
- Criar uma função assíncrona (não precisa do `close`):

```
async function runMongoose() {

    process.exit(0);
}

runMongoose().catch(console.dir);
```
- Estabelecer a conexão:
```
await mongoose.connect(uri);
```
- [Criar um schema](https://mongoosejs.com/docs/guide.html#definition):
```
const pedidoSchema = new mongoose.Schema({
    pizza: String,
    quantidade: Number,
    endereco: String    
    });
```
- Instanciar um **model**:
```
const Pedido = mongoose.model('Pedido', pedidoSchema);
```
- Instanciar os objetos:
```
const pedido = new Pedido({ pizza: 'Queijo' });
```
- Salvar
```
const resultado = await pedido.save();
console.log('Pedido salvo!', resultado.toJSON({getters: true}));
console.log('Pedido salvo!', resultado.toJSON({getters: true}).id);
```
- Localizar um pedido:

```
const Pedido = mongoose.model('Pedido', pedidoSchema);

let resultado = await Pedido.findOne().exec();
console.log(resultado.toJSON({getters: true}));

resultado = await Pedido.findOne({_id: "64025079d4003ffbad15c109"}, "pizza endereco -_id").exec();    
console.log(resultado);
```
- [Pesquisar mais do que um registro](https://mongoosejs.com/docs/queries.html):
```
resultado = await Pedido.find().exec();
console.log(resultado)
```
- Atualizar um pedido pelo `Id`:
```
const resultado = await Pedido.updateOne({_id: new mongoose.Types.ObjectId("63ef7324bcb72bc07fe84d84")}, {pizza: "Portuguesa"});
console.log(resultado)
```
- Remover um pedido pelo `Id`:
```
const resultado = await Pedido.deleteOne({_id: new mongoose.Types.ObjectId("63fa0413539ca38075c8b887")});
console.log(resultado)
```

### Validação do Schema
- Na definição do schema podem ser definidas [restrições](https://mongoosejs.com/docs/schematypes.html) de valores:

```
const pedidoSchema = new mongoose.Schema({
    pizza: {type:String, required: [true, "Nome da pizza é obrigatório"]},
    quantidade: Number,
    endereco: String    
    });
```
- Posteriormente podem ser validadas:
```
const validacao = pedido.validateSync();
console.log(validacao.errors['pizza'].message);
for (let erro in validacao.errors) {
    console.log(validacao.errors[erro].message);
}
```

### Exercício
- Criar um *schema* para pizza com nome e preço
- Cadastrar três pizzas utilizando o *mongoose*
- Alterar o *schema* pedido (já dado anteriormente) para possibilidar informar o `_id` da pizza ao invés do seu nome
- Criar uma função que retorna o nome, preço e endereço de entrega da pizza com base no nome de usuário que solicitou o pedido

### Breve nota sobre módulos JS
- NodeJS implementa uma estrutura de módulos bastante simples baseada no *CommonJS*
- Tudo o que é declarado dentro de um arquivo (módulo) é considerado privado: variáveis, constantes, funções, etc...
- Para que os elementos sejam declatrados públicos eles devem ser declarados na cláusula *exports*
- Arquivo `mensagem.js` com a constante `mensagem` privada
    ```
    const mensagem = "Boa noite!";
    ```
- Ao importar e exibir o conteúdo de `mensagem` em outro módulo:

    ```
    // importar o módulo mensagem.js
    const msg = require("./mensagem");

    console.log(msg);
    console.log(msg.mensagem);
    ```

- Alterar o módulo `mensagem.js` para exportar (público) a constante `mensagem`

    ```
    const mensagem = "Boa noite!";

    module.exports.mensagem = mensagem;
    ```

- Agora `mensagem` será acessível aos outros módulos

- Pode-se importar o módulo todo ou somente os elementos exportados por ele

```
const { mensagem } = require("./mensagem");

console.log(mensagem);
```

- Caso o módulo tenha somente um item declarado pode-se omitir o nome no `exports`:

```
const mensagem = "Boa noite!";
module.exports = mensagem;
```

### Estruturando o Projeto

- Criar uma pasta para armazenar os schemas, por exemplo `model`
- Criar uma pasta para armazenar a lógica de negócio, por exemplo `controller`
- Cada objeto do schema será representado por um arquivo `.js` contendo a sua cefinição
- Exemplo: `livro.js`
```
const mongoose = require('mongoose');

const livroSchema = mongoose.Schema({
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    resumo: String
});

module.exports = mongoose.model('Livro', livroSchema);
```
- Exemplo Controller: `livro-controller.js`
```
const mongoose = require ('mongoose');
const Livro = require('../model/livro');

const criarLivro = async (titulo, autor, resumo) => {

    const livro = new Livro({
        titulo: titulo,
        autor: autor,
        resumo: resumo
    });

    try {

        const ret = await livro.save();

    } catch (err) {
        console.log('Erro ao criar livro: ', err);
    }
}

exports.criarLivro = criarLivro;
```
- Teste
```
const mongoose = require('mongoose');
const livroController = require('./controller/livro-controller');

mongoose.set('strictQuery', false);

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/biblioteca?retryWrites=true&w=majority";s

mongoose.connect(uri).then(() => {
    console.log('conectado');
    livroController.criarLivro('Titlulo 1', 'Eu mesmo', 'Livro muito legal');
})
```
- Obter o livro pelo id:
```
const obterLivro = async (id) => {
    return await Livro.findById(id);
}
```
### Relacionamentos
- Criar um relacionamento entre livro e empréstimos
- Cada livro poderá ter vários empréstimos e um empréstimo somente será relacionado a um livro
- Utilizar a referência ao schema livro dentro de empréstimo
```
livro: {type: mongoose.Types.ObjectId, required: true, ref: 'Livro'}
```
### Relacionamento Unilateral

- Neste exemplo é criado um relacionamento entre o objeto `Emprestimo` e `Livro`
```
const emprestarLivro = async (livro, usuario, data) => {

    try {

        const emprestimo = new Emprestimo({data: data, livro: livro, usuario: usuario});
        return await emprestimo.save();

    } catch (err) {
        console.log(err);
    }

}
```
- Teste:
```
const ret = livroController.obterLivro('63fe47f4ffe2de2dedda865d').then((ret) => {

    console.log(ret);
    livroController.emprestarLivro(ret, 'esensato', new Date()).then((resultado) => {
        console.log("ok", resultado);
        process.exit(0);
    })

});
```
### Transações
- Quando mais de uma ação que altera dados na base é realizada ela deve ser eonvolvida em uma transação
```
try {

    const session = await mongoose.startSession();
    session.startTransaction();
    // Operações dentro da transação
    await session.commitTransaction();

} catch (err) {
    console.log(err);
}
```
### Relacionamento Bilateral
- Alterar o Livro para incluir uma coleção de empréstimos:
```
emprestimos: [{type: mongoose.Types.ObjectId, required: true, ref: 'Emprestimo'}]
```
- Alterar o `emprestarLivro` para incluir o relacionamento com empréstimo
```
const emprestarLivro = async (livro, usuario, data) => {

    let session;
    try {

        session = await mongoose.startSession();
        session.startTransaction();
        const emprestimo = new Emprestimo({data: data, livro: livro, usuario: usuario});
        await emprestimo.save({session: session});
        livro.emprestimos.push(emprestimo)
        await livro.save({session: session});
        await session.commitTransaction();
        return emprestimo;

    } catch (err) {
        console.log(err);
        await session.abortTransaction();
    } finally {
        if (session) {
            await session.endSession();
        }
    }
}
```

- Obtendo todos os livros emprestados por usuário

```
const emprestimosPorUsuario = async (usuario) => {

    return await Emprestimo.find({usuario: usuario}).populate('livro');

}
```

- Teste

```
let resultado = await livroController.emprestimosPorUsuario('esensato');
resultado.forEach((item) => console.log(item.livro.titulo))
```

- Devolução do Livro
    - Obter o livro pelo título juntamente com a lista de empréstimos
    - Localizar o empréstimo por meio do nome do usuário e o livro (objeto)
    - Remover o empréstimo da lista de empréstimos do livro
    - Salvar o livro
    - Remover o empréstimo

```
const devolucaoLivro = async (usuario, titulo) => {

    const livro = await Livro.findOne({titulo: titulo}).populate("emprestimos");
    const emprestimo = await Emprestimo.findOne({usuario: usuario, livro: livro});

    const session = await mongoose.startSession();
    session.startTransaction();
    livro.emprestimos.pull(emprestimo);
    await livro.save({session: session});
    await emprestimo.remove({session: session});
    await session.commitTransaction();
    return livro;

}
```