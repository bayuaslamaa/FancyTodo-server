require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT
const cors = require("cors")
const router = require("./routes/index")
const errorHandlers = require("./middlewares/errorHandlers")

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandlers)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})