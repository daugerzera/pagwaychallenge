import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import transacaoRotas from './rota/transacoes';
import saldoRotas from './rota/saldo';
import Transacao from './modelo/transacao';
import Recebivel from './modelo/recebivel';

const app = express();
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

app.use('/cuiabashoes', transacaoRotas);
app.use('/cuiabashoes', saldoRotas);

Recebivel.belongsTo(Transacao, {
    foreignKey: 'transacao_id',
    constraints: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
});

Transacao.hasOne(Recebivel, {
    foreignKey: 'transacao_id',
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});



export default app;


