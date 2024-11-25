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
    valor_transacao: props.valor,
    descricao_transacao: props.descricao,
    data_criacao_transacao: dataCriacaoTransacao,
    nome_portador_cartao: props.nomePortadorCartao,
    numero_cartao: ultimos4Cartao,
    validade_cartao: props.validadeCartao,
    codigo_seguranca_cartao: props.codigoSegurancaCartao,
  });

  return {
    dataCriacaoTransacao,
    transactionId: transaction.id,
  };
};