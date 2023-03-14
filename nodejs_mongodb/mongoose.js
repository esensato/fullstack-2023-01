const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/pizzaria?retryWrites=true&w=majority";

async function runMongoose() {

    await mongoose.connect(uri);
    console.log('conectado');
    const pedidoSchema = new mongoose.Schema({
        pizza: {type:String, required: [true, "Nome da pizza é obrigatório"]},
        quantidade: Number,
        endereco: String    
      });

      const Pedido = mongoose.model('Pedido', pedidoSchema);
      //const resultado = await Pedido.deleteOne({_id: new mongoose.Types.ObjectId("63fa0413539ca38075c8b887")});
      //const resultado = await Pedido.findOne({}).exec();
      const resultado = await Pedido.updateOne({_id: new mongoose.Types.ObjectId("63ef7324bcb72bc07fe84d84")}, {pizza: "Portuguesa"});
      console.log(resultado)
      //const pedido = new Pedido({ teste: 'Queijo' });
      //const validacao = pedido.validateSync();
      //console.log(validacao.errors['pizza'].message);
      //await pedido.save();
      //console.log('salvo')

  }
  
runMongoose().catch(console.dir);