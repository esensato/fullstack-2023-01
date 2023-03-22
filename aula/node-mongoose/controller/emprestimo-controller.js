const mongoose = require("mongoose");
const Livro = require('../model/livro');
const Emprestimo = require('../model/emprestimo');

const emprestar = async (livroId) => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const livro = await Livro.findById(livroId).exec();
        if (livro) {
            let emprestimo = new Emprestimo({livro: livro, data: new Date()});
            emprestimo = await emprestimo.save({session: session});
            livro.emprestimo.push(emprestimo);
            await livro.save({session: session});
            await session.commitTransaction();
            return emprestimo;
        }
        
    } catch (error) {
        console.log(error);
        session.abortTransaction();
    } finally {
        if (session) {
            session.endSession();
        }
    }

}

module.exports.emprestar = emprestar;