interface DataLayerCashin {
  persistCashin: (
    valorTransacao: number,
    descricaoTransacao: string,
    dataCriacaoTransacao: Date,
    nomePortadorCartao: string,
    numeroCartao: string,
    validadeCartao: Date,
    codigoSegurancaCartao: string
  ) => Promise<number>
}

interface CashinProps {
  valor: number;
  descricao: string;
  nomePortadorCartao: string;
  numeroCartao: string;
  validadeCartao: Date;
  codigoSegurancaCartao: string;
}

/**
 * FAKE SERVICES
 */
const checkValidCard = (props: CashinProps) => Promise.resolve()
const antifraud = (props: CashinProps) => Promise.resolve()
const mastercadApi = (props: CashinProps) => Promise.resolve()

const mkCashin = (db: DataLayerCashin) => async (props: CashinProps) => {
  await checkValidCard(props)
  await antifraud(props)
  await mastercadApi(props)

  const ultimos4Cartao = props.numeroCartao.slice(-4)
  const dataCriacaoTransacao = new Date()

  const transactionId = await db.persistCashin(
    props.valor,
    props.descricao,
    dataCriacaoTransacao,
    props.nomePortadorCartao,
    ultimos4Cartao,
    props.validadeCartao,
    props.codigoSegurancaCartao
  )

  return {
    dataCriacaoTransacao,
    transactionId
  }
}

export default mkCashin