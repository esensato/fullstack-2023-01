# Roteiro MongoDB

Banco de dados baseado em documentos.

- Banco de dados = Banco de dados
- Tabela = Coleção
- Registro = Documento
- Campo / Valor = Chave / Valor

Formato dos documentos: JSON.

Exemplo:

```
{origem: "SP", 
 destinio: "RJ", 
 distancia: 340.0, 
 passageiros: ["Joao", "Maria"],
 voo: {empresa: "TAM", id: "KLP100"}}
```

## Links Importantes

https://www.mongodb.com/atlas/database - cluster online

https://www.mongodb.com/try/download/community - community download instalação local

[Mongodb Shell](https://www.mongodb.com/try/download/shell)

## Prática

Iniciar o servidor:

`mongod -dbpath=db --bind_ip=0.0.0.0 &`

Executar o cliente:

`mongo`

Conexão via Compass: `mongodb://127.0.0.1:27017`

## Comandos Básicos

```
help

show dbs

use viagem

db

show collections

 var trecho = {origem: "SP", 
  destino: "RJ", 
  distancia: 340.0, 
  passageiros: ["Joao", "Maria"],
  voo: {empresa: "TAM", id: "KLP100"}};
 
trecho

// cria o documento

db.trechos.insertOne(trecho);

show collections

// lista todos os documentos

db.trechos.find();

db.trechos.find().pretty();

// atualiza a distância para o trecho entre SP e RJ ($set pode também ser usado para criar um novo atributo e $unset para remover)

db.trechos.updateOne({origem: "SP"}, {$set:{distancia: 370.0}});

// remove um documento

db.trechos.deleteOne({destino: "RJ"});

// cria a base de dados inicial para consulta

db.trechos.insertMany([{"origem": "SP", "destino": "RJ", "distancia": 435.9, "passageiros": ["Joao", "Maria"],"voo": {"empresa": "TAM", "id": "KLP100"}},
{"origem": "RJ", "destino": "BH", "distancia": 441.1, "passageiros": ["Joao", "Pedro"],"voo": {"empresa": "GOL", "id": "GLP200"}},
{"origem": "BH", "destino": "POA", "distancia": 1719.8 , "passageiros": ["Fernanda", "Maria"],"voo": {"empresa": "GOL", "id": "GLP300"}},
{"origem": "SP", "destino": "POA", "distancia": 1131.6, "passageiros": ["Joao", "Maria"],"voo": {"empresa": "TAM", "id": "TLN100"}},
{"origem": "SP", "destino": "DF", "distancia": 1005.1, "passageiros": ["Joao", "Maria"],"voo": {"empresa": "TAM", "id": "TLM100"}}]);

```

## Pesquisar Documentos

```
// busca todos os trechos com voos da TAM

db.trechos.find({"voo.empresa":"TAM"});

// retorna somente origem e destino

db.trechos.find({"voo.empresa":"TAM"}, {_id: 0, origem: 1, destino: 1});

// critérios

$lt, $lte, $gt, $gte, $ne 

// diferente de

db.trechos.find({origem: {$ne: "SP"}}, {});

// menor ou igual

db.trechos.find({distancia: {$lte: 1000.0}}, {});

// entre valores

db.trechos.find({distancia: {$gte: 1100.0, $lte: 1300.0}}, {});

```

## Arrays

```
// adicionando e removendo um item

db.trechos.updateOne({"voo.id": "KLP100"}, {$push: {passageiros: "Pedro"}});

db.trechos.updateOne({"voo.id": "KLP100"}, {$pull: {passageiros: "Pedro"}});

// busca documentos por um valor de um array

db.trechos.find({passageiros:"Joao"});

// busca por um valor exato

db.trechos.find({passageiros:["Joao","Maria"]});

// busca documentos por meio de um valor em posição específica no array

db.trechos.find({"passageiros.1":"Maria"});

```

## Agregação

Entrada -> Processamento 1 -> Processamento 2 -> Processamento n -> Resultado

```
// sumarizadores

db.trechos.aggregate([
	{$group:{_id: "$origem", total:{$sum: "$distancia"}}}
]);

// operadores: $sum, $avg, $max, $min, $first, $last

// ordenação (1 crescente e -1 decrescente)

db.trechos.aggregate([
	{$group:{_id: "$origem", total:{$sum: "$distancia"}}},
 	{$sort:{total: 1}}
]);

// contagem

db.trechos.aggregate([
	{$match: {origem: "SP"}},
	{$count: "Total Origem SP"}
]);

// filtrando antes de somar

db.trechos.aggregate([
	{$match: {origem: "SP"}},
 	{$group:{_id: "$origem", total:{$sum: "$distancia"}}},
 	{$sort:{total: 1}}
]);

// extraindo itens de arrays

db.trechos.aggregate([
	{$unwind: "$passageiros"}
]);

```

### Instalação

```
cd /etc/yum.repos.d/
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
dnf update -y

nano /etc/yum.repos.d/mongodb-org-4.2.repo

[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc

yum install –y mongodb-org

```



