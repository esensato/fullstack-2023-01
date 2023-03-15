const mongoose = require('mongoose');

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/exercicio-pizza?retryWrites=true&w=majority";

const pizzaSchema = mongoose.Schema({
    nome: {type: String, required: [true, "Informe o nome da pizza!"]},
    preco: {type: Number, min: [10.0, "Preço inválido"], required: true}
});

const pedidoSchema = new mongoose.Schema({
    usuario: {type: String, required: true},
    pizza: [{type: mongoose.Types.ObjectId, 
            required: [true, "Nome da pizza é obrigatório"],
            ref: "Pizza"}],
    quantidade: Number,
    endereco: String    
    });

const Pizza = mongoose.model("Pizza", pizzaSchema);
const Pedido = mongoose.model("Pedido", pedidoSchema);

const obterPedidoUsuario = async (param_usuario) => {

    // obter o pedido do usuário
    const pedido = await Pedido.findOne({usuario: param_usuario}).exec();
    console.log(pedido);
    // obter a pizza por _id
    const pizza = await Pizza.findById(pedido.pizza).exec();
    console.log(pizza)
    return {nome: pizza.nome, 
            preco: pizza.preco, 
            endereco: pedido.endereco, 
            qtde: pedido.quantidade};

}

const obterPedidoUsuarioV2 = async (param_usuario) => {

    // obter o pedido com a pizza do usuário
    const pedido = await Pedido.findOne({usuario: param_usuario}).populate("pizza").exec();
    console.log(pedido);
    return pedido;

}

mongoose.connect(uri).then(async (conn) => {

    const p1 = new Pizza({nome: 'Atum com Queijo', preco: 23.0});
    //await p1.save();
    const p2 = new Pizza({nome: 'Queijo com Alho', preco: 20.0});
    //await p2.save();
    const p3 = new Pizza({nome: 'Picanha com Alho', preco: 30.0});
    //await p3.save();

    // Criar um pedido com 2 pizzas
    const pedido_p1 = await Pizza.findOne({nome: 'Atum com Queijo'});
    const pedido_p2 = await Pizza.findOne({nome: 'Picanha com Alho'});

    const pd2 = new Pedido({usuario: "esensato", 
                            pizza: [pedido_p1, pedido_p2], 
                            endereco: 'Rua X', 
                            quantidade: 1});

    const pd1 = new Pedido({usuario: "esensato", 
                            pizza: new mongoose.Types.ObjectId('641106f57c31ba8b9bf6fe04'), 
                            endereco: 'Rua X', 
                            quantidade: 1});
    //await pd1.save();

    //await pd2.save();

    //const resultado = await obterPedidoUsuario("esensato");
    const resultado = await obterPedidoUsuarioV2("esensato");
    console.log(resultado);

    console.log('Fim');



}).catch((err) => console.log(err))