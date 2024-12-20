import { CashoutProps } from "../interface";
import Recebivel from "../modelo/recebivel";

export const mkCashout = (Model: typeof Recebivel) => {
  return async (props: CashoutProps) => {
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const costRate = 0.95;

    const statusRecebivel = 'pendente';
    const dataPagamentoRecebivel = new Date(props.dataCriacaoTransacao.getTime() + thirtyDaysMs);
    const valorLiquidoRecebivel = Math.round(props.valorTransacao * costRate);

    await Model.create({
      transacao_id: props.transactionId,
      status_recebivel: statusRecebivel,
      data_pagamento_recebivel: dataPagamentoRecebivel,
      valor_liquido_recebivel: valorLiquidoRecebivel,
    });
  };
};
