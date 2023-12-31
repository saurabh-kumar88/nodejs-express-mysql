const express = require("express")
const cors = require("cors")
const httpLogger = require("morgan")

const tutorialRoutes = require("../routes/tutorials.routes")

const app = express()

const corsOptions = {
    origin: "http://localhost:8081"
}

// define all middle-wares here
app.use(cors(corsOptions))
app.use(express.json()) //parse request with content-type - application/json
app.use(express.urlencoded({ extended: true })) // parse request with content-type - application/x-www-from-urlencoded
app.use(httpLogger('dev'))


// set port, listen for incoming requests
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Node.js server is running at - ${PORT}`)
})

app.use("/", tutorialRoutes)

