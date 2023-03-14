const mongoose = require('mongoose');

const livroSchema = mongoose.Schema({
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    resumo: String,
    emprestimos: [{type: mongoose.Types.ObjectId, required: true, ref: 'Emprestimo'}]
},);

module.exports = mongoose.model('Livro', livroSchema);