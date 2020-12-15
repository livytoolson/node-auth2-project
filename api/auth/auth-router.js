const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('./users-model');
const { checkPayload, checkUsernameUnique, checkUsernameExists } = require('../middlewares/auth-middlewares');

router.post('/register', checkPayload, checkUsernameUnique, async (req, res) => {
    let { user } = req.body
    try {
        const hash = bcrypt.hashSync(user.password, 12)
        const newUser = await User.add({ 
            username: user.username,
            password: hash
        })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/login', checkPayload, checkUsernameExists, async (req, res) => {
    // where does await go?
    try {
        const verifies = bcrypt.compareSync(req.body.password, req.userData.password)
        if (verifies) {
            req.session.user = req.userData
            res.json(`Welcome back, ${req.userData.username}`)
        } else {
            res.status(401).json('You shall not pass!')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
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