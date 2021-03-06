/* eslint-disable no-undef */
const chai = require('chai')
const supertest = require('supertest')
const app = require('../server/app')

const expect = chai.expect

describe('/payment-request API', () => {
  before(() => {
    process.env.DB_DATABASE = 'paygate_test'
    process.env.DB_PASSWORD = 'nopassword'
    process.env.API_KEY = '6b1C9sVURInQG6g1Lf31XcKxwP9k/AMFEI7PqukSH24='
    app.init();
  })

  describe('POST /api/payment-request', () => {
    it('should create a payment request', async () => {
      const { body } = await supertest(app.express)
        .post('/api/payment-request')
        .set('Authorization', process.env.API_KEY)
        .send({ returnUrl: 'https://return/url' })
        .expect(200)

      expect(body.id).to.be.not.empty
      expect(body.createdOn).to.be.not.empty
      expect(body.updatedOn).to.be.not.empty
      expect(body.status).to.equal('ON_PROGRESS')

      await supertest(app.express)
        .get(`/api/payment-request/${body.id}`)
        .set('Authorization', process.env.API_KEY)
        .expect(200, body)
    })

    it('should fail with status 400 if returnUrl is not a valid URI', async () => {
      await supertest(app.express)
        .post('/api/payment-request')
        .set('Authorization', app.config.apiKey)
        .send({ returnUrl: 'invalid/url' })
        .expect(400)
    })
  })
})