const sql = require("./db")

// constructor

const Tutorial = function(tutorial){
    this.title = tutorial.title
    this.description = tutorial.description
    this.published = tutorial.published
}


// Tutorial.create
Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tutorials SET?", newTutorial, (err, res) => {
        if(err){
            console.log(err.message)
            result(err, null)
            return;
        }
        console.log("created tutorial : ", { id: res.inserted, ...newTutorial });
        result(null, {id : res.insertedId, ...newTutorial })
    })

    // pool.getConnection(function(err, connection){
    // if(err){
    //     console.log(`Unable to created connection with db, reason -> ${err}`)
    // }
    // connection.query("INSERT INTO tutorials SET?", function(error, results, newTutorial){
    //     if(error){
    //         console.log(`Unbale to complete query, reaso -> ${error}`)
    //     }
    //     console.log(`created the record : ${results}`)
    //     connection.destroy()
    // })
}


// Tutorial.getAll
Tutorial.findAll = (title, result) => {
    let query = "SELECT * from tutorials";

    if(title){
        query.replace(";", "")
        query += ` WHERE title LIKE '%${title}%';`
    }
    sql.query(query, (err, res) => {
        if(err){
         console.log(err.message)
         result(err, null)
         return;   
        }
        console.log(`tutorials : ${res}`)
        result(null, res)
    })
}
// Tutorial.findById
Tutorial.findOne = (id, result) =>{
    let query = `SELECT * FROM tutorials WHERE id='${id}';`

    sql.query(query, (err, res) => {
        if(err){
            console.log(err.message)
            result(err, null)
            return;   
           }
           console.log(`tutorials : ${res}`)
           result(null, res)
        })
}
// Tutorial.getAllPublished
Tutorial.Published = result => {
    let query = "SELECT * from tutorials WHERE published='true'"
    sql.query(query, (err, data) => {
        if(err){
            console.log(err.message)
            result(err, null)
            return;   
           }
           console.log(`tutorials : ${data}`)
           result(null, data)
        })
}
// Tutorial.updateById
Tutorial.updateById = (id, tutorial, result) =>{
    sql.query(`UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id=${id}`, 
    [tutorial.title, tutorial.description, tutorial.published]),
    (err, data) => {
        if(err){
            console.log(err.message)
            result(err, null)
            return;   
           }
           if(data.affectedRows == 0)
           {
            result({kind: "not_found!"}, null)
            return;
           }
           console.log(`tutorials : ${data}`)
           result(null, data)
        }
    }
// Tutorial.remove
// Tutorial)removeAll

module.exports = Tutorial
