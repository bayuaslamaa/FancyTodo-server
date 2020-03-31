const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRETTOKEN)
}

const verify = (token) => {
    return jwt.verify(token, process.env.SECRETTOKEN)
}

module.exports = {
    generateToken,
    verify
}