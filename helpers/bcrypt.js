const bcrypt = require("bcryptjs")

const encryptPassword = (password) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

const decryptPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = { encryptPassword, decryptPassword }