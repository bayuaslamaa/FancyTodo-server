const { User } = require("../models/index")
const { decryptPassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {
    static register(req, res, next) {
        let payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(payload)
            .then(result => {
                let user = {
                    id: result.id,
                    email: result.email
                }
                let token = generateToken(user)
                return res.status(201).json({
                    'id': user.id,
                    'email': user.email,
                    'access_token': token
                })
            }).catch(err => {
                res.status(500).json({
                    err
                })
            })
    }

    static login(req, res, next) {
        let payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                "email": payload.email
            }
        }).then(result => {
            if (result) {
                let compare = decryptPassword(payload.password, result.password)
                if (compare) {
                    let user = {
                        id: result.id,
                        email: result.email,
                    }
                    return res.status(200).json({
                        id: user.id,
                        email: user.email,
                        access_token: generateToken(user)
                    })
                } else {
                    // return res.status(400).json({
                    //     type: 'Bad Request',
                    //     msg: 'Invalid email/password'
                    // }
                    return next({
                        name: 'InvalidLogin'
                    })
                    // )
                }
            } else {
                // return res.status(400).json({
                //     type: 'Bad Request',
                //     msg: 'Invalid email/password'
                // })
                return next({
                    name: 'InvalidLogin'
                })
            }
        })
    }
}

module.exports = UserController