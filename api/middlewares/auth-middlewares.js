const User = require('../users/users-model');

const checkPayload = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json('Username and password are required')
    } else {
        next()
    }
}

const checkUsernameUnique = async (req, res, next) => {
    try {
        const rows = await User.findBy({ username: req.body.username })
        if (!rows.length) {
            next()
        } else {
            res.status(401).json('Username is not unique. Please choose a different one.')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkUsernameExists = async (req, res, next) => {
    try {
        const rows = await User.findBy({ username: req.body.username })
        if (rows) {
            req.userData = rows[0]
            next()
        } else {
            res.status(401).json('Username does not exist.')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    checkPayload,
    checkUsernameUnique,
    checkUsernameExists
}