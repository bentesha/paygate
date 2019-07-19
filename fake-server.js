/* eslint-disable no-console */
const Queue = require('bull')
const uuid = require('uuid')

const requestQueue = new Queue('payment:request')
const responseQueue = new Queue('payment:response')

requestQueue.process(({ data }) => {
  console.log('Charge request received:', data)
  setTimeout(() => {
    const result = {
      transactionId: uuid(),
      amount: data.amount,
      msisdn: data.msisdn,
      reference: data.reference,
      description: 'Payment was successfully processed'
    }

    responseQueue.add(result)
    console.log('Payment success:', result)
  }, 10000);
})