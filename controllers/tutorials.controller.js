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
        published: req.body.published || false
    });

    Tutorial.create(tutorial, (err, data) => {
        if(err){
            res.status(409).send({
                message: "request cannot be completed due to conflict with current state!"
            })   
        }
        else res.status(200).send({
            message: `Success : ${data}`
        })
    })
}

exports.findAll = (req, res) => {
    const title = req.body.title
    Tutorial.findAll(title, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "request cannot be completed due to conflict with current state!"
            })   
        }
        else res.send(data)
    })    
}

exports.findAllPublished = (req, res) => {
    Tutorial.Published((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "request cannot be completed due to conflict with current state!"
            })   
        }
        else res.send(data)
    })    
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Tutorial.findOne(id, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "request cannot be completed due to conflict with current state!"
            })   
        }
        else res.send(data)
    })   
}

exports.updateOne = (req, res) => {
    const id = req.params.id
    const tutorial = req.body
    Tutorial.updateById(id, tutorial, (error, data) => {
        if(error){
        res.status(500).send({
            message: error.message || "request cannot be completed due to conflict with current state!"
        })   
    }

    else
    {
     res.send(data)}
    })
}

exports.deleteOne = (req, res) => {
 const id = req.params.id
 Tutorial.remove(id, (error, data) => {
    if(error){
        res.status(500).send({
            message: error.message || "request cannot be completed due to conflict with current state!"
        })
    }else{
        res.send(data)
    }
 })   
}

exports.deleteAll = (req, res) => {
     Tutorial.removeAll((error, data) => {if(error){
        res.status(500).send({
            message: error.message || "request cannot be completed due to conflict with current state!"
        })
    }else{
        res.send(data)
    }})  
}

