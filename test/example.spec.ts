/* eslint-disable prettier/prettier */
import { test, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process' // consigo executar qualquer comando do terminal no código
// Eu jamais devo criar um teste que dependa de outro

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test.skip('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  test.skip('Shoud be able to list all transactions', async () => {
    // criando a transaction
    const createTransactionReponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
    
    const cookies = createTransactionReponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookies) // enviar um cookie no cabeçalho da requisição = set
    .expect(200)

    // agora, vou criar o modelo para que a resposta seja comparada a ele
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      })
    ])

  })

  test.skip('Shoud be able to get a specific transaction', async () => {
    // criando a transaction
    const createTransactionReponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
    
    const cookies = createTransactionReponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookies) // enviar um cookie no cabeçalho da requisição = set
    .expect(200)

    const transactionId =  listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
    .get(`/transactions/${transactionId}`)
    .set('Cookie', cookies) // enviar um cookie no cabeçalho da requisição = set
    .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  test('Shoud be able to get a summary', async () => {
    // criando a transaction
    const createTransactionReponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
    
    const cookies = createTransactionReponse.get('Set-Cookie')
    
    await request(app.server)
      .post('/transactions')
      .send({
      title: 'Debit transaction',
      amount: 1000,
      type: 'debit',
    })
    
    const summaryResponse = await request(app.server)
    .get('/transactions/summary')
    .set('Cookie', cookies)
    .expect(200)
  
    expect(summaryResponse.body.summary).toEqual({
      amount: 5000,
      }
    )
  })
})
