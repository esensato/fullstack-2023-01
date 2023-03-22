const mongoose = require('mongoose');
const Livro = require('../model/livro');

const criar = async (titulo, autor) => {
    const livro = new Livro({titulo: titulo, autor: autor});
    return await livro.save();
}

module.exports.criar = criar;
