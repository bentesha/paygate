
exports.up = function(knex) {
  return knex.schema.createTable('payment_attempt', table => {
    table.string('id').primary()
    table.string('paymentSessionId').notNullable().references('id').inTable('payment_session')
    table.string('paymentRequestId').notNullable().references('id').inTable('payment_request')
    table.dateTime('createdOn').notNullable()
    table.dateTime('updatedOn').notNullable()
    table.dateTime('requestSentOn')
    table.dateTime('responseReceivedOn')
    table.string('status').notNullable()
    table.string('paymentMethod')
    table.string('phoneNumber')
    table.decimal('amount', 10, 2)
    table.string('transactionId')
    table.string('message')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('payment_attempt')
};
