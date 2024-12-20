import { describe, expect, test } from 'vitest';
import { mkCashin } from './cashin';
import Transacao from '../modelo/transacao';

const dadosTrasaçãoOK = {
  codigoSegurancaCartao: '123',
  descricao: 'smartband',
  nomePortadorCartao: 'fulano',
  numeroCartao: '1234123412345678',
  validadeCartao: new Date(Date.now() + 24 * 60 * 60 * 1000),
  valor: 100.00
}

describe('BATERIA DE TESTES PARA O SERVIÇO DE CRIAÇÃO DE NOVAS TRANSAÇÕES', () => {
  describe('setup da injeção de dependência', () => {
    test('o módulo mkCashin deve existir', () => {
      expect(mkCashin).toBeDefined()
    })
    test('o módulo mkCashin deve ser uma função', () => {
      const typeMkCashin = typeof mkCashin
      expect(typeMkCashin).toBe('function')
    })
    test('a função mkCashin deve retornar outra função', () => {
      const cashin = mkCashin({
        create: () => Promise.resolve(1)
      })
      const typeCashin = typeof cashin
      expect(typeCashin).toBe('function')
    })
    test('a função retornada deve responder com o id mockado', async () => {
      const transactionInMocked = 1
      const cashin = mkCashin({
        create: () => Promise.resolve({ id: transactionInMocked })
      })

      const sut = await cashin(dadosTrasaçãoOK)

      expect(sut.transactionId).toBe(transactionInMocked)
    })
  })
  describe('retorna os valores corretos', () => {
    test('data de criação da transação deve ser atual', async () => {
      const cashin = mkCashin({
        create: () => Promise.resolve(1)
      })

      const sut = await cashin(dadosTrasaçãoOK)

      const agora = Date.now()
      const lowDelta = Math.abs(agora - sut.dataCriacaoTransacao.getTime()) < 100

      expect(lowDelta).toBe(true)
    })
  })
  describe('persiste os valores corretos', () => {
    test('apenas os últimos 4 digitos devem ser salvos', async () => {
      const cashin = mkCashin({
        create: ({ numero_cartao }: typeof Transacao) => {
          const realLast4 = dadosTrasaçãoOK.numeroCartao.slice(-4)
          expect(numero_cartao).toBe(realLast4)

          return Promise.resolve(1)
        }
      })

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('a data de criação da transação persistida deve ser recente', async () => {
      const cashin = mkCashin({
        create: () => Promise.resolve(1)
      })
      const sut = await cashin(dadosTrasaçãoOK)
      const agora = Date.now()
      const lowDelta = Math.abs(agora - sut.dataCriacaoTransacao.getTime()) < 100
      expect(lowDelta).toBe(true)
      return Promise.resolve(1)
    })
    test('o valor da transação persistido deve ser o mesmo do argumento', async () => {
      const cashin = mkCashin({
        create: ({ valor_transacao }: typeof Transacao) => {
          expect(valor_transacao).toBe(dadosTrasaçãoOK.valor)
          return Promise.resolve(1)
        }
      })

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('a descrição da transação persistida deve ser a mesma do argumento', async () => {
      const cashin = mkCashin({
        create: ({ descricao_transacao }: typeof Transacao) => {
          expect(descricao_transacao).toBe(dadosTrasaçãoOK.descricao)
          return Promise.resolve(1)
        }
      })

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('o nome do portador da transação persistido deve ser o mesmo do argumento', async () => {
      const cashin = mkCashin({
        create: ({ nome_portador_cartao }: typeof Transacao) => {
          expect(nome_portador_cartao).toBe(dadosTrasaçãoOK.nomePortadorCartao)
          return Promise.resolve(1)
        }
      })

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('a validade do cartão persistida deve ser a mesma do argumento', async () => {
      const cashin = mkCashin({
        create: ({ validade_cartao }: typeof Transacao) => {
          expect(validade_cartao).toBe(dadosTrasaçãoOK.validadeCartao)
          return Promise.resolve(1)
        }
      })

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('o código de segurança do cartao persistido deve ser o mesmo do argumento', async () => {
      const cashin = mkCashin({
        create: ({ codigo_seguranca_cartao }: typeof Transacao) => {
          expect(codigo_seguranca_cartao).toBe(dadosTrasaçãoOK.codigoSegurancaCartao)
          return Promise.resolve(1)
        }
      })

      const sut = await cashin(dadosTrasaçãoOK)
    })
  })
})
