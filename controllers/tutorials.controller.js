const Tutorial = require("../models/tutorials.models")

exports.health = (req, res) => {
    if(!req.body){
        res.status(500).send({
            message: `Invalid request! : ${req.body}`
        })
    }
    res.status(200).send({
        message: "all is good!"
    })
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