import { Request, Response } from 'express';
import Recebivel from '../modelo/recebivel';

export const getBalance = async (req: Request, res: Response) => {
  try {
    const disponivelPromise = Recebivel.sum('valor_liquido_recebivel', {
      where: {
        status_recebivel: 'liquidado',
      },
    });

    const previstoPromise = Recebivel.sum('valor_liquido_recebivel', {
      where: {
        status_recebivel: 'pendente',
      },
    });

    const [disponivelResult, previstoResult] = await Promise.all([
      disponivelPromise,
      previstoPromise,
    ]);

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
