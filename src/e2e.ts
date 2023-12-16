import { setTimeout } from 'node:timers/promises'
import axios from 'axios'

const baseURL = process.env.E2E_BASE_URL ?? ''

const got = axios.create({
  baseURL
});

;(async () => {
  console.log('E2E')
  console.log(`baseURL=${baseURL}`)

  console.log('\n')

  console.log('GET /cuiabashoes/saldo')
  const req1 = await got({
    url: '/cuiabashoes/saldo'
  })
  console.dir(req1.data)

  console.log('\n')

  console.log('LAST /cuiabashoes/transacao')
  const req2 = await got<any[]>({
    url: '/cuiabashoes/transacao?size=1&order=desc'
  })
  console.dir(req2.data[0])

  console.log('\n')

  console.log('NEW /cuiabashoes/transacao')
  const req3 = await got({
    method: 'post',
    url: '/cuiabashoes/transacao',
    headers: { 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      valor: 10000,
      descricao: "teste insert pela API",
      nomePortadorCartao: "E2E tester",
      numeroCartao: "1234123412341234",
      validadeCartao: "2038/12/31 23:59:59",
      codigoSegurancaCartao: "123"
    })
  })

  console.dir(req3.data)


  console.log('\n')

  console.log('waiting 100ms')
  await setTimeout(100)

  console.log('\n')

  console.log('GET /cuiabashoes/saldo')
  const req4 = await got({
    url: '/cuiabashoes/saldo'
  })
  console.dir(req4.data)

  console.log('\n')

  console.log('LAST /cuiabashoes/transacao')
  const req5 = await got<any[]>({
    url: '/cuiabashoes/transacao?size=1&order=desc'
  })
  console.dir(req5.data[0])
})()