import type mkCashin from './service/cashin'
import type mkCashout from './service/cashout'

import db from './db'

type PersistCashin = Parameters<typeof mkCashin>[0]["persistCashin"]
type PersistCashout = Parameters<typeof mkCashout>[0]["persistCashout"]
type Rows = { id: number }

const SQLCashin = `INSERT INTO
  pagway.transacao (
    valor_transacao, 
    descricao_transacao, 
    data_criacao_transacao, 
    nome_portador_cartao,
    numero_cartao,
    validade_cartao,
    codigo_seguranca_cartao
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7
  )
  RETURNING id;
`
const SQLCashout = `INSERT INTO
pagway.recebivel (
  transacao_id,
  status_recebivel,
  data_pagamento_recebivel,
  valor_liquito_recebivel
)
VALUES (
  $1,
  $2,
  $3,
  $4
);`

const SQLPaginatedTransactionASC = `SELECT
  valor_transacao,
  descricao_transacao,
  data_criacao_transacao,
  nome_portador_cartao,
  numero_cartao,
  validade_cartao,
  codigo_seguranca_cartao
FROM
  pagway.transacao
ORDER BY
  transacao.id ASC
LIMIT
  $2
OFFSET
  $1
;`
const SQLPaginatedTransactionDESC = `SELECT
  valor_transacao,
  descricao_transacao,
  data_criacao_transacao,
  nome_portador_cartao,
  numero_cartao,
  validade_cartao,
  codigo_seguranca_cartao
FROM
  pagway.transacao
ORDER BY
  transacao.id DESC
LIMIT
  $2
OFFSET
  $1
;`

const persistCashin: PersistCashin = async (valorTransacao, descricaoTransacao, dataCriacaoTransacao, nomePortadorCartao, numeroCartao, validadeCartao, codigoSegurancaCartao) => {
  const { rows } = await db.query<Rows>(SQLCashin, [valorTransacao, descricaoTransacao, dataCriacaoTransacao, nomePortadorCartao, numeroCartao, validadeCartao, codigoSegurancaCartao])

  return rows[0].id
}

const persistCashout: PersistCashout = async (transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquitoRecebivel) => {
  console.dir({
    transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquitoRecebivel
  })
  
  await db.query(SQLCashout, [transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquitoRecebivel])
}

interface ReadPaginatedTransactionParam {
  offset: number,
  limit: number,
  order: 'ASC' | 'DESC'
}
interface TransactionElement {
  valorTransacao: number;
  descricaoTransacao: string;
  dataCriacaoTransacao: Date;
  nomePortadorCartao: string;
  numeroCartao: number;
  validadeCartao: string;
  codigoSegurancaSartao: string;
}
const readPaginatedTransaction = async ({ offset, limit, order }: ReadPaginatedTransactionParam): Promise<Array<TransactionElement>> => {
  console.dir({
    offset, limit, order
  })

  let rows: Array<TransactionElement>

  if (order === 'ASC') {
    const query = await db.query<TransactionElement>(SQLPaginatedTransactionASC, [offset, limit])
    rows = query.rows
  } else {
    const query = await db.query<TransactionElement>(SQLPaginatedTransactionDESC, [offset, limit])
    rows = query.rows
  }

  return rows
}

export default {
  persistCashin,
  persistCashout,
  readPaginatedTransaction
}