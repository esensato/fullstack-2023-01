const mongoose = require('mongoose');

const emprestimoSchema = mongoose.Schema({
    data: {type: String, required: true},
    usuario: {type: String, required: true},
    livro: {type: mongoose.Types.ObjectId, required: true, ref: 'Livro'}
});

module.exports = mongoose.model('Emprestimo', emprestimoSchema);