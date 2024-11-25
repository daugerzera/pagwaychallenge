import Transacao from "../modelo/transacao";

interface CashinProps {
  valor: number;
  descricao: string;
  nomePortadorCartao: string;
  numeroCartao: string;
  validadeCartao: string;
  codigoSegurancaCartao: string;
}

const checkValidCard = (props: CashinProps) => Promise.resolve();
const antifraud = (props: CashinProps) => Promise.resolve();
const mastercadApi = (props: CashinProps) => Promise.resolve();

export const mkCashin = async (props: CashinProps) => {
  await checkValidCard(props);
  await antifraud(props);
  await mastercadApi(props);

  const ultimos4Cartao = props.numeroCartao.slice(-4);
  const dataCriacaoTransacao = new Date();

  const transaction = await Transacao.create({
    valorTransacao: props.valor,
    descricaoTransacao: props.descricao,
    dataCriacaoTransacao,
    nomePortadorCartao: props.nomePortadorCartao,
    numeroCartao: ultimos4Cartao,
    validadeCartao: props.validadeCartao,
    codigoSegurancaCartao: props.codigoSegurancaCartao,
  });

  return {
    dataCriacaoTransacao,
    transactionId: transaction.id,
  };
};