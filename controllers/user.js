const { User } = require("../models/index")
const { decryptPassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');


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
                let token = generateToken(payload)
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
                    return next({
                        name: 'InvalidLogin'
                    })
                    // )
                }
            } else {
                return next({
                    name: 'InvalidLogin'
                })
            }
        })
    }

    static googleSign(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        }).then(ticket => {
            email = ticket.getPayload().email
            return User.findOne({
                where: {
                    "email": payload.email
                }
            })
        }).then(data => {
            if (data) {
                let payload = {
                    email: data.email,
                    password: data.password
                }
                let access_token = generateToken(payload)
                return res.status(200).json({
                    id: data.id,
                    email: data.email,
                    access_token
                })
            } else {
                return User.create({
                    email,
                    password: 'default'
                })
            }
        }).then(data => {

            let payload = {
                email: data.email,
                password: data.password
            }
            let access_token = generateToken(payload)
            return res.status(201).json({
                id: data.id,
                email: data.email,
                access_token
            })
        })
    }
}
module.exports = UserController