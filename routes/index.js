const router = require("express").Router()
const todoRoutes = require("./todoRoutes")
const userRoutes = require("./userRoutes")
const apiRoutes = require("./apiRoutes")

router.get("/", (req, res) => {
    res.status(200).json({ message: `welcome to my app` })
})
router.use("/", userRoutes)
router.use("/todos", todoRoutes)
router.use("/api", apiRoutes)



module.exports = router