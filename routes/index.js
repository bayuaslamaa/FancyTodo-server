const router = require("express").Router()
const todoRoutes = require("./todoRoutes")

router.get("/", (req, res) => {
    res.status(200).json({ message: `welcome to my app` })
})
router.use("/todos", todoRoutes)


module.exports = router