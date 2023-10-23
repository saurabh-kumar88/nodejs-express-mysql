const Tutorial = require("../models/tutorials.models")
const validator = require("../utils/generic_validator.js")
const CONST = require("../constants")

exports.health = async (req, res, next) => {
    await res.send({message: "All is in good health!"})
}

exports.create = (req, res) => {
    if(!req.body){
        res.status(500).send({
            message: `Invalid request! : ${req.body}`
        })
    }
    
    const validate = new validator()
    const title = validate.validateString(req.body.title, 
        'title', 10, 50, CONST.VALID_TITLE_PATTERN)
    const description = validate.validateString(req.body.description, 
        'description', 10, 500, CONST.VALID_DESCRIPTION_PATTERN)
    const published = validate.validateBool(req.body.published, 'published')

    const tutorial = new Tutorial();

    tutorial.create({
        title: title,
        description: description,
        published: published}, (err, data) => {
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
    const tutorial = new Tutorial()
    const title = req.body.title

    tutorial.findAll(title, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "request cannot be completed due to conflict with current state!"
            })   
        }
        else res.send(data)
    })    
}

exports.findAllPublished = (req, res) => {
    const tutorial = new Tutorial()

    tutorial.Published((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "request cannot be completed due to conflict with current state!"
            })   
        }
        else res.send(data)
    })    
}

exports.findOne = (req, res) => {
    const tutorial = new Tutorial()
    const id = req.params.id

    tutorial.findOne(id, (err, data) => {
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
    const tutorialUpdate = {}
    const validate = new validator()
    const tutorial = new Tutorial()
    
    if(req.body.title){
        tutorialUpdate.title = validate.validateString(req.body.title, 
            'title', 10, 50, CONST.VALID_TITLE_PATTERN)    
    }
    if(req.body.description){
        tutorialUpdate.description = validate.validateString(req.body.description, 
            'description', 10, 500, CONST.VALID_DESCRIPTION_PATTERN)
    }
    if(req.body.published){
        tutorialUpdate.published = validate.validateBool(req.body.published, 'published')
    }
   
    tutorial.updateById(id, tutorialUpdate, (error, data) => {
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
 const tutorial = new Tutorial()

 tutorial.remove(id, (error, data) => {
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
    const tutorial = new Tutorial()
     
    tutorial.removeAll((error, data) => {if(error){
        res.status(500).send({
            message: error.message || "request cannot be completed due to conflict with current state!"
        })
    }else{
        res.send(data)
    }})  
}

