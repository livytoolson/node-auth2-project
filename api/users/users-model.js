const db = require('../../data/dbConfig');

module.exports = {
    add,
    findAll,
    findBy,
    findById
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
  }

function findAll() {
    return db('users')
    .select('id', 'username', 'department')
    .orderBy('id')
}

function findBy(filter) {
    return db('users')
    .where(filter)
}

function findById(id) {
    return db('users')
    .select('id', 'username', 'department')
    .where({ id })
    .first()
}