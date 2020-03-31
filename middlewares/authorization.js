// const { Todo } = require("../models/index")
const authorization = (req, res, next) => {

    // Todo.findAll({
    //     where: {
    //         'UserId': req.currentUserId
    //     }
    // })
    //     .then(result => {
    // if (result) {
    req.authorizedId = req.currentUserId
    return next()
    // }
    // })


}

module.exports = authorization