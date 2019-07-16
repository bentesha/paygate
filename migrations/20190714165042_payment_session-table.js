
exports.up = function(knex) {
  return knex.schema.createTable('payment_session', table => {
    table.string('id').primary()
    table.string('paymentRequestId').notNullable().references('id').inTable('payment_request')
    table.dateTime('createdOn').notNullable()
    table.dateTime('updatedOn').notNullable()
    table.dateTime('requestSentOn')
    table.dateTime('responseReceivedOn')
    table.string('status').notNullable()
    table.string('returnUrl').notNullable()
    table.string('paymentMethod')
    table.string('phoneNumber')
    table.decimal('amount', 10, 2)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('payment_session')
};
