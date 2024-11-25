import sequelize from "../config/db";
import Sequelize from "sequelize";

const Recebivel = sequelize.define('Recebivel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    transacao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    status_recebivel: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    data_pagamento_recebivel: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    valor_liquido_recebivel: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'recebivel',
    schema: 'pagway',
    timestamps: false,
    indexes: [
        {
            name: 'recebivel_status_recebivel_idx',
            fields: ['status_recebivel'],
        },
    ],
});

export default Recebivel;
