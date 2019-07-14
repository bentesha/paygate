
exports.up = function(knex) {
  return knex.schema.createTable('payment_request', table => {
    table.string('id').primary()
    table.dateTime('createdOn').notNullable()
    table.dateTime('updatedOn').notNullable()
    table.string('returnUrl').notNullable()
    table.string('status').notNullable()
    table.decimal('amount', 10, 2)
    table.string('phoneNumber')
    table.string('paymentMethod')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('payment_request')
};
