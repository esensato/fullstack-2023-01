const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://teste:teste@cluster0.wnbdk2i.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const pizzaria = client.db('pizzaria');
    const pedidos = pizzaria.collection('pedidos');
    //const pedido = await pedidos.findOne();
    //const resultado = await pedidos.insertOne({pizza: "Marguerita", quantidade: 2, endereco: "Rua Z, 234"});
    //const resultado = await pedidos.updateOne({_id: new ObjectId("63f901e76ea77a958cd09600")}, {$set: {quantidade: 3}});
    //const resultado = await pedidos.deleteOne({_id: new ObjectId("63f901e76ea77a958cd09600")});
    //const resultado = await pedidos.find();
    //await resultado.forEach((obj) => {
    //    console.log(obj.pizza, obj.quantidade, obj.endereco)
    //});

    const resultado = await pedidos.countDocuments();

    console.log(resultado);
    
  } finally {
    await client.close();
  }
}

run().catch(console.dir);