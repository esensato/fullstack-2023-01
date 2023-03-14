const mongoose = require('mongoose');
const livroController = require('./controller/livro-controller');
const Livro = require('./model/livro');

mongoose.set('strictQuery', false);

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/biblioteca?retryWrites=true&w=majority";

const criarEmprestimo = async () => {
    return await livroController.emprestarLivro(new Livro({titulo: "Aprendendo mongodb", autor: "Joao", resumo: "Livro muito bom"}), "esensato", new Date())
}


async function runMongoose() {
    await mongoose.connect(uri);
    console.log('Conectado!');
    //let resultado = await livroController.emprestimosPorUsuario('esensato');
    //let resultado = await criarEmprestimo();
    //resultado.forEach((item) => console.log(item.livro.titulo))
    let resultado = await livroController.devolucaoLivro("esensato", "Aprendendo mongodb");
    console.log(resultado);
    process.exit(0);
}

runMongoose().catch(console.dir);

