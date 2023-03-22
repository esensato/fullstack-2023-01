const mongoose = require('mongoose');
const livroController = require ('./controller/livro-controller');
const emprestimoController = require('./controller/emprestimo-controller');

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/biblioteca?retryWrites=true&w=majority";

mongoose.connect(uri).then(async (conn) => {

    //const ret = await livroController.criar('Livro de Java', 'John Code');
    const ret = await emprestimoController.emprestar("641a546aaeae70c6ce18aa57");
    console.log(ret);

})