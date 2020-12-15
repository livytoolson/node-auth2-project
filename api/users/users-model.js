const db = require('../../data/dbConfig');

module.exports = {
    add,
    findAll,
    findBy,
    findById
}

// function add(user) {
//     return db('users')
//     .insert(user, 'id')
//     .then((id) => {
//         return db('users').where({ id }).first()
//     })
// }

async function add(user) {
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
  }

function findAll() {
    return db('users as u')
    .select('u.id', 'u.username', 'u.department')
    .orderBy('id')
}

function findBy(filter) {
    return db('users')
    .select('id', 'username', 'department')
    .where(filter)
}

function findById(id) {
    return db('users')
    .select('id', 'username', 'department')
    .where({ id })
    .first()
}