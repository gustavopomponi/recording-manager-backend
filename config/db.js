const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  dialectOptions: {
        insecureAuth: true
  },
  define: {
    underscored: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables

//db.recordings = require('../models/recordings')(sequelize,Sequelize);
/*db.clienteendereco = require('../models/clienteendereco')(sequelize,Sequelize);
db.endereco = require('../models/endereco')(sequelize,Sequelize);
db.formapagamento = require('../models/formapagamento')(sequelize,Sequelize);
db.grupoproduto = require('../models/grupo')(sequelize,Sequelize);
db.nota = require('../models/nota')(sequelize, Sequelize);
db.notaformapagamento = require('../models/notaformapagamento')(sequelize,Sequelize);
db.notaproduto = require('../models/notaproduto')(sequelize,Sequelize);
db.produto = require('../models/produto')(sequelize, Sequelize);
db.produtovenda = require('../models/produtovenda')(sequelize,Sequelize);
db.telefonecliente = require('../models/telefonecliente')(sequelize,Sequelize);
db.telefonefornecedor = require('../models/telefonefornecedor')(sequelize,Sequelize);
db.tipoparentesco = require('../models/tipoparentesco')(sequelize,Sequelize);
db.tipotelefone = require('../models/tipotelefone')(sequelize,Sequelize);
db.vendanota = require('../models/vendanota')(sequelize,Sequelize);
db.fornecedor = require('../models/fornecedor')(sequelize,Sequelize);
db.fornecedorproduto = require('../models/fornecedorproduto')(sequelize,Sequelize);
*/

//Relations
/*
db.grupoproduto.hasMany(db.produto);
db.produto.belongsToMany(db.vendanota, { through: db.produtovenda });
db.vendanota.belongsToMany(db.produto, { through: db.produtovenda });
db.cliente.hasMany(db.vendanota);
db.cliente.hasMany(db.nota);
db.nota.hasMany(db.vendanota);
db.nota.belongsToMany(db.formapagamento, { through: db.notaformapagamento });
db.formapagamento.belongsToMany(db.nota, { through: db.notaformapagamento });
db.tipotelefone.hasMany(db.telefonecliente);
db.tipotelefone.hasMany(db.telefonefornecedor);
db.cliente.hasMany(db.telefonecliente);
db.fornecedor.hasMany(db.telefonefornecedor);
db.cliente.belongsToMany(db.endereco, { through: db.clienteendereco });
db.endereco.belongsToMany(db.cliente, { through: db.clienteendereco });
db.cliente.hasMany(db.cliente, { as: 'children', foreignKey: 'conta_principal_id'});
db.tipoparentesco.hasMany(db.cliente);
db.fornecedor.belongsToMany(db.produto, { through: db.fornecedorproduto });
db.produto.belongsToMany(db.fornecedor, { through: db.fornecedorproduto });
*/

//db.produto.belongsToMany(db.nota, { through: db.notaproduto });
//db.nota.belongsToMany(db.produto, { through: db.notaproduto });

//db.nota.belongsTo(db.cliente);

module.exports = db;
