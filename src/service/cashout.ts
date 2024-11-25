import Recebivel from "../modelo/recebivel";


interface CashoutProps {
  dataCriacaoTransacao: Date;
  valorTransacao: number;
  transactionId: number;
}

export const cashoutService = async (props: CashoutProps) => {
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const costRate = 0.95;

  const statusRecebivel = 'pendente';
  const dataPagamentoRecebivel = new Date(props.dataCriacaoTransacao.getTime() + thirtyDaysMs);
  const valorLiquidoRecebivel = Math.round(props.valorTransacao * costRate);

  await Recebivel.create({
    transacaoId: props.transactionId,
    statusRecebivel,
    dataPagamentoRecebivel,
    valorLiquidoRecebivel,
  });
};
