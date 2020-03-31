const { verify } = require("../helpers/jwt")
const { User } = require("../models")

const authentication = (req, res, next) => {
    try {
        let decoded = verify(req.headers.access_token)
        User.findOne({
            where: {
                'id': decoded.id
            }
        })
            .then(result => {
                if (result) {
                    req.currentUserId = result.id
                    return next()
                } else {
                    return next({
                        name: 'BadRequest'
                    })
                }
            })
            .catch(error => {
                return next(error)
            })
    } catch (error) {
        return next(error)
    }
}

module.exports = authentication