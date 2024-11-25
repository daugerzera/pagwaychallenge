import { Request, Response } from 'express';
import Recebivel from '../modelo/recebivel';

export const getBalance = async (req: Request, res: Response) => {
  console.log(req.url, new Date());

  try {
    const disponivelResult = await Recebivel.sum('valorLiquidoRecebivel', {
      where: {
        statusRecebivel: 'liquidado',
      },
    });
    const previstoResult = await Recebivel.sum('valorLiquidoRecebivel', {
      where: {
        statusRecebivel: 'pendente',
      },
    });

    const disponivel = disponivelResult || 0;
    const previsto = previstoResult || 0;

    res.status(200).json({
      saldo: {
        disponivel,
        previsto,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Erro interno do servidor',
    });
  }
};
