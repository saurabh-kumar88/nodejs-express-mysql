const express = require("express")
const cors = require("cors")

const app = express()

const corsOptions = {
    origin: "http://localhost:8081"
}

// define all middle-wares here
app.use(cors(corsOptions))
app.use(express.json()) //parse request with content-type - application/json
//app.use(express.urlencoded({ extended: true })) // parse request with content-type - application/x-www-from-urlencoded

// urls

app.get("/", function(req, res){
    console.log(req)
    res.send("hello world!!")
})

app.post("/createUser", function(req, res){
    console.log(req.body.name)
    res.send("New user has been created!")
})

// set port, listen for incoming requests
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Node.js server is running at - ${PORT}`)
})



