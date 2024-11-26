import { config } from 'dotenv';
config();

const Sequelize = require('sequelize');

if (!process.env.DB_CONN) {
    throw new Error('A variável de ambiente DB_CONN não foi definida.');
}

const sequelize = new Sequelize(process.env.DB_CONN, {
    dialect: 'postgres',
    logging: false,
});

export default sequelize;