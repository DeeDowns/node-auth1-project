
exports.seed = function(knex) {
  const users = [
    {
      username: 'user1'
    },
    {
      username: 'user2'
    },
    {
      username: 'user3'
    }
  ]

  return knex('users').insert(users)
};
