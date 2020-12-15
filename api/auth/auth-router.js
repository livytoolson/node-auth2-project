const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('./users-model');
const { 
    checkPayload, 
    checkUsernameUnique, 
    checkUsernameExists } 
= require('../middlewares/auth-middlewares');
const generateToken = require('../utils/generate-token');

router.post('/register', checkPayload, checkUsernameUnique,  (req, res) => {
    const credentials = req.body
    if (credentials) {
        const rounds = process.env.BCRYPT_ROUNDS || 5

        const hash = bcrypt.hashSync(credentials.password, rounds)

        credentials.password = hash

        User.add(credentials)
        .then(user => {
            const token = generateToken(user)
            res.status(201).json({ data: user, token})
        }) 
    } 
})

router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
    const { username, password } = req.body
    if(req.body) {
        User.findBy({ username: username })
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)

                res.status(200).json({ 
                    message: `Welcome, ${username}!`, 
                    token
                });
            } else {
                res.status(400).json({ message: `You shall not pass!`})
            }
        }) 
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    } 
})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.json('You cannot leave')
            } else {
                res.json('Goodbye for now!')
            }
        })
    } else {
        res.status(500).json('There was never a session')
    }
})

module.exports = router;