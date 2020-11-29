const dbConfig = require('../config/db.config')

const Sequelize = require('sequelize');

const { DB, USER, PASSWORD, HOST, dialect } = dbConfig;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect,
    operatorAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.max,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require('./employee.model')(sequelize, Sequelize);

module.exports = db;
