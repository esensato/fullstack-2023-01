const mongoose = require ('mongoose');
const Livro = require('../model/livro');
const Emprestimo = require('../model/emprestimo');

const criarLivro = async (titulo, autor, resumo) => {

    const livro = new Livro({
        titulo: titulo,
        autor: autor,
        resumo: resumo
    });

    try {

        const ret = await livro.save();

    } catch (err) {
        console.log('Erro ao criar livro: ', err);
    }
}

const obterLivro = async (id) => {
    return await Livro.findById(id);
}

const emprestarLivro = async (livro, usuario, data) => {

    try {

        const session = await mongoose.startSession();
        session.startTransaction();
        const emprestimo = new Emprestimo({data: data, livro: livro, usuario: usuario});
        await emprestimo.save({session: session});
        livro.emprestimos.push(emprestimo)
        await livro.save({session: session});
        await session.commitTransaction();
        return emprestimo;

    } catch (err) {
        console.log(err);
    }

}

const emprestimosPorUsuario = async (usuario) => {

    return await Emprestimo.find({usuario: usuario}).populate('livro');

}

const devolucaoLivro = async (usuario, titulo) => {

    const livro = await Livro.findOne({titulo: titulo}).populate("emprestimos");
    const emprestimo = await Emprestimo.findOne({usuario: usuario, livro: livro});

    const session = await mongoose.startSession();
    session.startTransaction();
    livro.emprestimos.pull(emprestimo);
    await livro.save({session: session});
    await emprestimo.remove({session: session});
    await session.commitTransaction();
    return livro;

}

exports.criarLivro = criarLivro;
exports.emprestarLivro = emprestarLivro;
exports.obterLivro = obterLivro;
exports.emprestimosPorUsuario = emprestimosPorUsuario;
exports.devolucaoLivro = devolucaoLivro;