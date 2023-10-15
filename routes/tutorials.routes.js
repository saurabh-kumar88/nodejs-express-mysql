const tutorials = require("../controllers/tutorials.controller.js")
const router = require("express").Router()

// create a new tutorial
router.get("/health", tutorials.health)
router.post("/create", tutorials.create)

module.exports = router;