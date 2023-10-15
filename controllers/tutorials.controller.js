const Tutorial = require("../models/tutorials.models")

exports.health = async (req, res, next) => {
    await res.send({message: "All is in good health!"})
}

exports.create = (req, res) => {
    if(!req.body){
        res.status(500).send({
            message: `Invalid request! : ${req.body}`
        })
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.description || false
    });

    Tutorial.create(tutorial, (err, data) => {
        if(err){
            res.status(409).send({
                message: "request cannot be completed due to conflict with current state!"
            })   
        }
        else res.statue(200).send({
            message: `Success : ${data}`
        })

    })

}