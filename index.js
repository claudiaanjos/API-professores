const express = require('express');
const roteador = require('./roteadores');
const senha = require('./intermediario')

const app = express();
app.use(express.json());
app.use(senha);
app.use(roteador);

app.listen(8000);