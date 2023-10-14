module.exports = app => {
    const tutorials = require("../controllers/tutorials.controller.js")
    var router = require("express").Router()

    // create a new tutorial
    router.get("/health", tutorials.health)
    router.post("/create", tutorials.create)
}