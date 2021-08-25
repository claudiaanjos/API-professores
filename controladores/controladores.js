const listaProfessores = require('../dados/professores');

const disciplinasValidas = ["Português", "Inglês", "Matemática", "Biologia", "Química", "Geografia", "História", "Física", "Artes"]


function consultaProfessores (req, res) {
    res.json(listaProfessores);
}



function consultaProfessor (req, res) {
    const professor = listaProfessores.find((professor) => professor.id === Number(req.params.idConsultado));

    if(!professor) {
        res.status(404).json({
            erro: "Professor " + req.params.idConsultado + " não existe!"
        });
        return;
    }

    res.json(professor);
}



let proximoId = 4;

function validarProfessor (professor) {
    if (!professor.nome) {
        return "O campo nome é obrigatório!";
    }
    if (!professor.idade) {
        return "O campo idade é obrigatório!";
    }
    if (!professor.disciplina) {
        return "O campo disciplina é obrigatório!";
    }


    if (typeof professor.nome !== "string") {
        return  "O campo nome deve ser preenchido com um texto.";
    }
    if (typeof professor.idade !== "number") {
        return "O campo idade deve ser preenchido com um número.";
    }
    if (typeof professor.disciplina !== "string") {
        return "O campo disciplina deve ser preenchido com um texto.";
    }


    if (professor.idade < 18) {
        return "O professor deve ser maior de idade.";
    }
    if (!disciplinasValidas.includes(professor.disciplina)) {
        return "Disciplina inválida.";
    }
    if (professor.nome.length === 0) {
        return "O nome não pode estar vazio.";
    }
}



function adicionarProfessor (req, res) {
    
    const erro = validarProfessor (req.body);
    if (erro) {
        return res.status(400).json ({ erro });
    }


    const novoProfessor = {
        id: proximoId,
        nome: req.body.nome,
        idade: req.body.idade,
        disciplina: req.body.disciplina
    }

    listaProfessores.push(novoProfessor);
    proximoId += 1;
    res.json(novoProfessor)
}



function editarProfessor (req, res) {
    const professor = listaProfessores.find((professor) => professor.id === Number(req.params.idConsultado));

    if (!professor) {
        res.status(404).json({
            erro: "Professor " + req.params.idConsultado + " não existe!"
        });
        return;
    }

    const erro = validarProfessor({
        nome: req.body.nome === undefined ? professor.nome : req.body.nome,
        idade: req.body.idade === undefined ? professor.idade : req.body.idade,
        disciplina: req.body.disciplina === undefined ? professor.disciplina : req.body.disciplina
    });
    if (erro) {
        return res.status(400).json({ erro });
    }


    if (req.body.nome !== undefined) {
        professor.nome = req.body.nome;
    }
    if (req.body.idade !== undefined) {
        professor.idade = req.body.idade;
    }
    if (req.body.disciplina !== undefined) {
        professor.disciplina = req.body.disciplina;
    }

    res.json(professor);
}


function substituirProfessor (req, res) {
    const erro = validarProfessor(req.body);
    if (erro) {
        return res.status(400).json({ erro });
    }


    if (req.body.id !== Number(req.params.idConsultado)) {
        return res.status(400).json({
            erro: "o campo id deve ser igual na rota e no corpo da requisição."
        });
    }


    const professor = listaProfessores.find((professor) => professor.id === Number(req.params.idConsultado));

    if (professor) {
        professor.nome = req.body.nome;
        professor.idade = req.body.idade;
        professor.disciplina = req.body.disciplina;

        res.json(professor);
    } else {
        const novoProfessor = req.body;
        listaProfessores.push(novoProfessor);
        res.json(novoProfessor)
    }
}


function deletarProfessor (req, res) {
    const professor = listaProfessores.find((professor) => professor.id === Number(req.params.idConsultado));

    if (!professor) {
        return res.status(404).json({ erro: "Professor " + req.params.idConsultado + " não existe!" });
    }

    const indice = listaProfessores.indexOf(professor);
    listaProfessores.splice(indice, 1);
    res.json(professor);
}


module.exports = {
    consultaProfessores,
    consultaProfessor,
    adicionarProfessor,
    editarProfessor,
    substituirProfessor,
    deletarProfessor
}