import { CashinProps } from '../interface';
import Transacao from '../modelo/transacao';


const onlyNumber = /^\d+$/;

const checkValidCard = (props: CashinProps) => Promise.resolve();
const antifraud = (props: CashinProps) => Promise.resolve();
const mastercardApi = (props: CashinProps) => Promise.resolve();

const checkFields = (props: CashinProps) => {
  const { valor, descricao, nomePortadorCartao, numeroCartao, validadeCartao, codigoSegurancaCartao } = props;
  const valorOK = typeof valor === 'number' && Number.isFinite(valor) && valor > 0 && valor % 1 === 0;
  const descricaoOK = typeof descricao === 'string' && descricao.length > 0 && descricao.length < 1024;
  const nomePortadorCartaoOK = typeof nomePortadorCartao === 'string' && nomePortadorCartao.length > 0 && nomePortadorCartao.length < 1024;
  const numeroCartaoOK = typeof numeroCartao === 'string' && numeroCartao.length === 16 && onlyNumber.test(numeroCartao);
  const validadeCartaoDate = new Date(validadeCartao);
  const validadeCartaoOK = !isNaN(validadeCartaoDate.getTime()) && validadeCartaoDate.getTime() > Date.now();
  const codigoSegurancaCartaoOK = typeof codigoSegurancaCartao === 'string' && codigoSegurancaCartao.length === 3 && onlyNumber.test(codigoSegurancaCartao);
  const allOK = valorOK && descricaoOK && nomePortadorCartaoOK && numeroCartaoOK && validadeCartaoOK && codigoSegurancaCartaoOK;

  if (!allOK) throw new Error('Dados de entrada inválidos');
};

export const mkCashin = (Model: typeof Transacao) => {
  return async (props: CashinProps) => {
    checkFields(props);

    await checkValidCard(props);
    await antifraud(props);
    await mastercardApi(props);

    const ultimos4Cartao = props.numeroCartao.slice(-4);
    const dataCriacaoTransacao = new Date();

    const transaction = await Model.create({
      valor_transacao: props.valor,
      descricao_transacao: props.descricao,
      data_criacao_transacao: dataCriacaoTransacao,
      nome_portador_cartao: props.nomePortadorCartao,
      numero_cartao: ultimos4Cartao,
      validade_cartao: props.validadeCartao,
      codigo_seguranca_cartao: props.codigoSegurancaCartao
    });

    return {
      dataCriacaoTransacao,
      transactionId: transaction.id
    };
  };
};