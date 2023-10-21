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
// [tutorial.title, tutorial.description, tutorial.published, id]
Tutorial.updateById = (id, tutorial, result) =>{
    sql.query("UPDATE tutorials SET ? WHERE id = ?"[{title: tutorial.title, description: tutorial.description, published: tutorial.published}, id],
    (err, data) => {
        if(err){
            console.log(err)
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
    )}
// Tutorial.remove
Tutorial.remove = (id, result) => {
    sql.query(`DELETE FROM tutorials WHERE id=${id};`, (error, data) => {
        if(error){
            console.log(error.message)
            result(error, null)
            return;   
           }
           if(data.affectedRows == 0)
           {
            result({kind: "not_found!"}, null)
            return;
           }
           console.log(`Removed : ${data}`)
           result(null, data)
        })
    }

// Tutorial.removeAll
Tutorial.removeAll = (result) => {
    sql.query("DELETE FROM tutorials;", (error, data) => {if(error){
        console.log(error.message)
        result(error, null)
        return;   
       }
       if(data.affectedRows == 0)
       {
        result({kind: "not_found!"}, null)
        return;
       }
       console.log(`All rows are removed : ${data}`)
       result(null, data)})
}

module.exports = Tutorial
