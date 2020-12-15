const jwt = require('jasonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const secret = process.env.JWT_SECRET || "Is it secret, is it safe?"

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options);
}

module.exports = generateToken;