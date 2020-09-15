const db = require('../data/db-config')

module.exports = {
    get,
    getBy,
    getById,
    add
}

function get() {
    return db('users').select('id', 'username').orderBy('id')
}

function getBy(filter) {
    return db('users').where(filter).orderBy('id')
}

function getById(id) {
    return db('users').where({ id }).first()
}

//return new user id, username, and password
async function add(user) {
    try {
      const [id] = await db("users").insert(user, "id");
  
      return getById(id);
    } catch (error) {
      throw error;
    }
  }


//returns new user id
// function add(user) {
//     return db('users').insert(user, 'id')

// }
