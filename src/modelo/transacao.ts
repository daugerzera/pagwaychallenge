import sequelize from "../config/db";
import Sequelize from "sequelize";

const Transacao = sequelize.define('Transacao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    valor_transacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    descricao_transacao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    data_criacao_transacao: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    nome_portador_cartao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    numero_cartao: {
        type: Sequelize.CHAR(4),
        allowNull: false,
    },
    validade_cartao: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    codigo_seguranca_cartao: {
        type: Sequelize.CHAR(3),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'transacao',
    schema: 'pagway',
    timestamps: false,
});

module.exports = Transacao;
