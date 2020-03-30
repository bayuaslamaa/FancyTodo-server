const { Todo } = require("../models/index")

class TodoController {
    static create(req, res) {
        const { title, description, status, due_date } = req.body
        Todo.create({
            title,
            description,
            status,
            due_date
        }).then(data => res.status(201).json(data))
            .catch(err => res.status(400).json(err))
            .catch(error => res.status(500).json({
                message: `Internal server errror`,
                error
            }))
    }
    static findAll(req, res) {
        Todo.findAll()
            .then(data => res.status(200).json({
                message: `success getting all data`,
                todo: data
            }))
            .catch(err => res.status(500).json(err))
    }

    static findByPk(req, res) {
        const id = req.params.id
        Todo.findByPk(id)
            .then(data => {
                if (data) { //handle data null
                    res.status(200).json({
                        message: `success getting data with id: ${id}`,
                        todo: data
                    })
                }
                throw new Error
            })
            .catch(err => res.status(404).json({
                Error: `id not found`
            }))
    }

    static update(req, res) {
        const id = req.params.id
        const { title, description, status, due_date } = req.body
        let updated = { title, description, status, due_date }
        Todo.update(updated, {
            where: {
                "id": id
            }
        }).then(data => {
            return Todo.findByPk(id)
        }).catch(err => res.status(400).json(err))
            .then(updatedData => {
                if (updatedData) {
                    res.status(200).json({
                        message: `success updating data with id: ${id}`,
                        todo: updatedData
                    })
                }
                throw new Error
            })
            .catch(error => res.status(404).json({
                error: `not found`
            }))
            .catch(err => res.status(500).json(err))
    }
    static destroy(req, res) {
        const id = req.params.id
        Todo.findByPk(id)
            .then(deleted => {
                if (deleted) {
                    res.status(200).json({
                        message: `success deleting data with id: ${id}`,
                        deleted: deleted
                    })
                } else {
                    throw new Error
                }
                return Todo.destroy({
                    where: {
                        "id": id
                    }
                })
            })
            .catch(error => res.status(404).json({
                error: `not found`
            }))
            .catch(err => res.status(500).json(err))
    }

}

module.exports = TodoController