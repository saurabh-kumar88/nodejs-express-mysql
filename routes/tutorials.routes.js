const tutorials = require("../controllers/tutorials.controller.js")
const router = require("express").Router()

// create a new tutorial
router.get("/health", tutorials.health)
router.post("/", tutorials.create)
router.get("/", tutorials.findAll)
router.get("/published", tutorials.findAllPublished)
//router.get("/:id", tutorials.findOne)
router.put("/:id", tutorials.updateOne)
// router.delete("/:id", tutorials.deleteOne)
// router.delete("/", tutorials.deleteAll)

module.exports = router;