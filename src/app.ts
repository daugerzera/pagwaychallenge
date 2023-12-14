import express from 'express'
import cors from 'cors'

const app = express()

app.set('trust proxy', 1)
app.use(cors())

app.post('/cuiabashoes/transacao', express.json(), async (req, res) => {
  const {
    valor,
    descricao,
    nomePortadorCartao,
    numeroCartao,
    validadeCartao,
    codigoSegurancaCartao
  } = req.body

  res.status(200).json({
    ok: true
  })
})

app.get('/cuiabashoes/transacao', async (req, res) => {
  const { page = '1', size = '20', order = 'asc' } = req.query

  res.status(200).json([{
    "valor": 123,
    "descricao": "Smartband XYZ 3.0",
    "nomePortadorCartao": "Amaral B. Cuiabano",
    "numeroCartao": "1234123412341234",
    "validadeCartao": "2038/12/31 23:59:59",
    "codigoSegurancaCartao": "123"
}])
})

app.get('/cuiabashoes/saldo', async (req, res) => {
  res.status(200).json({
    "saldo": {
      "disponivel": 0,
      "previsto": 4200
    }
  })
})


export default app