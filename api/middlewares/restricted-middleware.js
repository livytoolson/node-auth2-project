const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({message: 'Missing token' })
  } else {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        res.status(401).json('We want a good token: ' + error.message)
      } else {
        req.decodedToken = decoded
        next()
      }
    })
  }
};