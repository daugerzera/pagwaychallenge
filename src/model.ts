import type mkCashin from './service/cashin'
import type mkCashout from './service/cashout'

type PersistCashin = Parameters<typeof mkCashin>[0]["persistCashin"]
type PersistCashout = Parameters<typeof mkCashout>[0]["persistCashout"]

const persistCashin: PersistCashin = async (valorTransacao, descricaoTransacao, dataCriacaoTransacao, nomePortadorCartao, numeroCartao, alidadeCartao, codigoSegurancaCartao)=> {
  return 1
}

const persistCashout: PersistCashout = async (transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquitoRecebivel) => {

}

export default {
  persistCashin,
  persistCashout
}