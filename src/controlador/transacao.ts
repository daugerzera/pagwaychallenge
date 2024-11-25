import { Request, Response } from 'express';
import mkCashin from '../service/cashin_old';
import mkCashout from '../service/cashout_old';
import Transacao from '../modelo/transacao';

const onlyNumber = /^\d+$/;

export const createTransaction = async (req: Request, res: Response) => {
  const {
    valor,
    descricao,
    nomePortadorCartao,
    numeroCartao,
    validadeCartao,
    codigoSegurancaCartao,
  } = req.body;

  const valorOK = typeof valor === 'number' && Number.isFinite(valor) && valor > 0 && valor % 1 === 0;
  const descricaoOK = typeof descricao === 'string' && descricao.length > 0 && descricao.length < 1024;
  const nomePortadorCartaoOK = typeof nomePortadorCartao === 'string' && nomePortadorCartao.length > 0 && nomePortadorCartao.length < 1024;
  const numeroCartaoOK = typeof numeroCartao === 'string' && numeroCartao.length === 16 && onlyNumber.test(numeroCartao);
  const validadeCartaoDate = new Date(validadeCartao);
  const validadeCartaoOK = !isNaN(validadeCartaoDate.getTime()) && validadeCartaoDate.getTime() > Date.now();
  const codigoSegurancaCartaoOK = typeof codigoSegurancaCartao === 'string' && codigoSegurancaCartao.length === 3 && onlyNumber.test(codigoSegurancaCartao);
  const allOK = valorOK && descricaoOK && nomePortadorCartaoOK && numeroCartaoOK && validadeCartaoOK && codigoSegurancaCartaoOK;

  if (!allOK) {
    res.status(400).send({
      error: true,
      message: 'Dados de entrada inválidos',
    });
    console.error(req.body);
    return;
  }

  try {
    const { transactionId, dataCriacaoTransacao } = await mkCashin({
      valor,
      descricao,
      nomePortadorCartao,
      numeroCartao,
      validadeCartao,
      codigoSegurancaCartao,
    });

    res.status(200).json({
      ok: true,
    });

    await mkCashout({
      dataCriacaoTransacao,
      transactionId,
      valorTransacao: valor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Erro interno do servidor',
    });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  console.log(req.url, new Date());
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
