const express = require('express');
const professores = require('./controladores/controladores');

const roteador = express();

roteador.get("/professores", professores.consultaProfessores);
roteador.get("/professores/:idConsultado", professores.consultaProfessor);
roteador.post("/professores", professores.adicionarProfessor);
roteador.patch("/professores/:idConsultado", professores.editarProfessor);
roteador.put("/professores/:idConsultado", professores.substituirProfessor);
roteador.delete("/professores/:idConsultado", professores.deletarProfessor);

module.exports = roteador;