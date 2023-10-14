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
            console.log(err)
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


// Tutorial.findById
// Tutorial.getAll
// Tutorial.getAllPublished
// Tutorial.updateById
// Tutorial.remove
// Tutorial)removeAll
