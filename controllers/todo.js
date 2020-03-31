const { Todo } = require("../models/index")

class TodoController {
    static create(req, res, next) {
        const { title, description, status, due_date } = req.body
        Todo.create({
            title,
            description,
            status,
            due_date,
            UserId: req.currentUserId
        }).then(data => res.status(201).json(data))
            .catch(err => {
                return next(err)
            })
    }
    static findAll(req, res) {
        Todo.findAll({
            where: {
                'UserId': req.authorizedId
            }
        })
            .then(data => res.status(200).json({
                message: `success getting all data`,
                todo: data
            }))
            .catch(err => {
                return next(err)
            })
    }

    static findByPk(req, res, next) {
        const id = req.params.id
        Todo.findOne({
            where: {
                'id': id,
                'UserId': req.authorizedId
            }
        })
            .then(data => {
                if (data) { //handle data null
                    res.status(200).json({
                        message: `success getting data with id: ${id}`,
                        todo: data
                    })
                } else {
                    return next({
                        name: 'NotFound'
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static update(req, res) {
        const id = req.params.id
        const { title, description, status, due_date } = req.body
        let updated = { title, description, status, due_date }
        Todo.update(updated, {
            where: {
                "id": id,
                "UserId": req.authorizedId
            }
        }).then(data => {
            return Todo.findOne({
                where: {
                    'id': id,
                    "UserId": req.authorizedId
                }
            })
        }).catch(err => {
            return next(err)
        })
            .then(updatedData => {
                if (updatedData) {
                    res.status(200).json({
                        message: `success updating data with id: ${id}`,
                        todo: updatedData
                    })
                } else {
                    return next({
                        name: 'NotFound'
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
    static destroy(req, res) {
        const id = req.params.id
        Todo.findOne({
            where: {
                'id': id,
                "UserId": req.authorizedId
            }
        })
            .then(deleted => {
                if (deleted) {
                    res.status(200).json({
                        message: `success deleting data with id: ${id}`,
                        deleted: deleted
                    })
                } else {
                    return next({
                        name: 'NotFound'
                    })
                }
                return Todo.destroy({
                    where: {
                        "id": id,
                        "UserId": req.authorizedId
                    }
                })
            })
            .catch(error => {
                return next(error)
            })
            .catch(err => {
                return next(err)
            })
    }

}

module.exports = TodoController