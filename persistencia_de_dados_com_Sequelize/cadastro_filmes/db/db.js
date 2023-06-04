const Sequelize = require('sequelize');

const sequelize = new Sequelize ({
  dialect: 'sqlite',
  storage: './filmes.sqlite'
}); 

try{
  sequelize.authenticate();
  console.log('banco de dados conectado com sucesso')
}catch(erro){
  console.log('Erro ao conectar ao banco de dados', erro)
}

module.exports = sequelize;