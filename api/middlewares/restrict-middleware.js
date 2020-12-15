
const restricted = (req, res, next) => {
    if (req.session && req.session.username) {
        next()
    } else {
        res.status(401).json('You shall not pass!')
    }
}

module.exports = restricted;