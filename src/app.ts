import express from 'express';
const Recebivel = require('./models/recebivel');
const Transacao = require('./models/transacao');

const app = express();

app.use(express.json());
// app.use('/cashin', cashInRoutes);

// Recebivel.belongsTo(Transacao, {
//     foreignKey: 'transacao_id',
//     constraints: true,
//     onDelete: 'NO ACTION',
//     onUpdate: 'CASCADE',
// });

// Transacao.hasOne(Recebivel, {
//     foreignKey: 'transacao_id',
// });

export default app;