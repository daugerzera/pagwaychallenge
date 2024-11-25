import { Request, Response } from 'express';
import Transacao from '../modelo/transacao';
import { mkCashin } from '../service/cashin';
import { mkCashout } from '../service/cashout';

export const createTransaction = async (req: Request, res: Response) => {

    try {
        const { transactionId, dataCriacaoTransacao } = await mkCashin(req.body);

        res.status(200).json({
            ok: true,
            // previousTransactions:
        });

        await mkCashout({
            dataCriacaoTransacao,
            transactionId,
            valorTransacao: req.body.valor,
        });
    } catch (error: any) {
        if (error.message === 'Dados de entrada inválidos') {
            res.status(400).send({
                error: true,
                message: error.message,
            });
            console.error(req.body);
        } else {
            console.error(error);
            res.status(500).json({
                error: true,
                message: 'Erro interno do servidor',
            });
        }
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    let { page = '1', size = '20', order = 'asc' } = req.query;

    const pageInt = parseInt(page as string);
    const pageValid = isNaN(pageInt) || pageInt < 1 ? 1 : pageInt;

    const sizeInt = parseInt(size as string);
    const sizeValid = isNaN(sizeInt) || sizeInt < 1 ? 1 : sizeInt;
    const sizeCrop = sizeValid > 200 ? 200 : sizeValid;

    const orderDirection = order === 'desc' ? 'DESC' : 'ASC';

    const offset = sizeCrop * (pageValid - 1);
    const limit = sizeCrop;

    try {
        const transactions = await Transacao.findAll({
            offset,
            limit,
            order: [['id', orderDirection]],
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Erro interno do servidor',
        });
    }
};
