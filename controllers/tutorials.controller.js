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

    Tutorial.create({
        title: title,
        description: description,
        published: published}, (err, data) => {
        if(err){
            res.status(409).send({
                message: CONST.BD_ERROR
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
                message: err.message || CONST.BD_ERROR
            })   
        }
        else res.send(data)
    })    
}

exports.findAllPublished = (req, res) => {

    Tutorial.Published((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || CONST.BD_ERROR
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
                message: err.message || CONST.BD_ERROR
            })   
        }
        else res.send(data)
    })   
}

exports.updateOne = (req, res) => {
    const id = req.params.id
    const tutorialUpdate = {}
    const validate = new validator()
    
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
   
    Tutorial.updateById(id, tutorialUpdate, (error, data) => {
        if(error){
        res.status(500).send({
            message: error.message || CONST.BD_ERROR
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
            message: error.message || CONST.BD_ERROR
        })
    }else{
        res.send(data)
    }
 })   
}

exports.deleteAll = (req, res) => {
     
    Tutorial.removeAll((error, data) => {if(error){
        res.status(500).send({
            message: error.message || CONST.BD_ERROR
        })
    }else{
        res.send(data)
    }})  
}

