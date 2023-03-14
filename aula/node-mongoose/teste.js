const { MongoClient } = require("mongodb");
const mongoose = require ("mongoose");

const testeMongodb = async () => {
    const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/?retryWrites=true&w=majority";
    const conn = await MongoClient.connect(uri);
    const db = conn.db("cadastro");
    const collection = db.collection("pessoas");
    await collection.insertOne({descricao: "Estacionamento", preco: 150.0, data: new Date()});
    await conn.close();
    return "Ok";
}

const testeMongoose = async () => {
    const pessoa = new Pessoa({idade: 10,
                              telefone: "xxx",
                              fruta: "Melancia", // ignorado por nao estar no schema
                              endereco: "Rua X, 123", 
                              nascimento: new Date()});
    let valida = await pessoa.validateSync();
    for (let erro in valida.errors) {
        console.log(valida.errors[erro].message);
    }
    //const resultado = await pessoa.save();
    return "";
}

const consultaPessoa = async () => {
    //const resultado = await Pessoa.findOne({nome: "Joao"}, "nome endereco -_id").exec();
    //const resultado = await Pessoa.find({descricao: "Estacionamento"}).exec();
    //resultado = await Pedido.updateOne({_id: new mongoose.Types.ObjectId("63ef7324bcb72bc07fe84d84")}, {pizza: "Portuguesa"});
    
    //const resultado = await Pessoa.findOne({nome: "Joao"}).exec();
    //resultado.nome = "Joao da Silva";
    //await resultado.save();
    
    const resultado = await Pessoa.updateOne(
        {_id: new mongoose.Types.ObjectId("6407cbd01107a61e331a4afe")},
        {endereco: "Rua Y, 333", telefone: 3423424});
    return resultado;
}

const pessoaSchema = mongoose.Schema({
    nome: {type: String, required: [true, "Informe o nome da pessoa obrigatoriamente!"]},
    telefone: Number,
    endereco: String,
    nascimento: Date,
    idade: {type: Number, min: [18, "Idade mínima deve ser de 18 anos!"]}
});

const Pessoa = new mongoose.model("Pessoa", pessoaSchema);

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/cadastro?retryWrites=true&w=majority";
mongoose.connect(uri).then((conn) => {
    testeMongoose().then((resultado) => console.log(resultado));
    //consultaPessoa().then((resultado) => console.log(resultado));
})

testeMongodb().then((ret) => console.log(ret)).catch((err) => console.log(err))
console.log("FIM");
