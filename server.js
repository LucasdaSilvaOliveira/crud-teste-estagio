const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste_estagio', 'root', process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  query: { raw: true }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const User = sequelize.define('usuarios', {
  nome: Sequelize.STRING,
  email: Sequelize.STRING
});

app.get('/cadastrados', (req, res) => {
  User.findAll().then(data => {
    res.send(data)
  })
})

app.post('/cadastrar', (req, res) => {
  User.create({ nome: req.body.nome, email: req.body.email }).then(() => {
    console.log('Cadastrado com sucesso!')
  })
})

app.delete('/deletar/:id', (req, res) => {
  User.destroy({where: {id: req.params.id}}).then(() => {
    console.log('Usuário deletado com sucesso!')
  })
})

app.put('/atualizar/:id',(req, res) => {
  User.update({nome: req.body.nome}, {where:{ id: req.params.id} }).then(() => {
    console.log('Atualizado com sucesso!')
  })
})

app.listen(3001, () => {
  console.log('http://localhost:3001/')
})