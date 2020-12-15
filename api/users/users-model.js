const db = require('../../data/dbConfig');

module.exports = {
    add,
    findAll,
    findBy,
    findById
}

function add(user) {
    return db('users')
    .insert(user, 'id')
    .then((id) => {
        return db('users').where({ id }).first()
    })
}

function findAll() {
    return db('users').select('id', 'username', 'password').orderBy('id')
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id')
}

function findById(id) {
    return db('users').where({ id }).first()
}