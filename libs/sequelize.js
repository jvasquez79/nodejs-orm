const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.dbEngine}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//const pool = new Pool({ connectionString: URI });

const sequelize = new Sequelize(URI, {
    dialect: config.dbEngine, // se usa variable de entorno para cambiar fácilmente el motor de bd
    logging: true
});

setupModels(sequelize);
//sequelize.sync(); // no se debe usar en producción
//console.log(sequelize);

module.exports = sequelize;