const mongoose = require('mongoose');

const emprestimoSchema = mongoose.Schema({
    data: {type: Date, required: true},
    livro: {type: mongoose.Types.ObjectId, required: true, ref: "Livro"}
});

const Emprestimo = mongoose.model('Emprestimo', emprestimoSchema);
module.exports = Emprestimo;