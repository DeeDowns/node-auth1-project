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

async function add(user) {
    try {
      const [id] = await db("users").insert(user, "id");
  
      return getById(id);
    } catch (error) {
      throw error;
    }
  }
