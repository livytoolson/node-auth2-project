const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/users-model');
const { 
    checkPayload, 
    checkUsernameUnique, 
    checkUsernameExists } 
= require('../middlewares/auth-middlewares');
const { generateToken } = require('../utils/generate-token');


router.post('/register', checkPayload, checkUsernameUnique, async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hash
        const newUser = await User.add({ username: req.body.username, password: hash })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
    try {
        const verifies = bcrypt.compareSync(req.body.password, req.userData.password)
        if (verifies) {
            const token = generateToken(req.userData)
            res.status(200).json({ 
                message: `Welcome, ${req.userData.username}`, 
                token
            })
        } else {
            res.status(401).json('You shall not pass!')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/logout', (req, res) => {
    
})

module.exports = router;