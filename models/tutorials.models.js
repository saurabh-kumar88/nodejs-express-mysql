const sql = require("./db")

// constructor

class Tutorial {
    constructor(){
        // TODO: add something
    }

    create(newTutorial, result){
        sql.query("INSERT INTO tutorials SET?", newTutorial, (err, res) => {
            if(err){
                console.log(err.message)
                result(err, null)
                return;
            }
            console.log("created tutorial : ", { id: res.inserted, ...newTutorial });
            result(null, {id : res.insertedId, ...newTutorial })
        })
    }

    updateById(id, tutorial, result){
        let query = buildSqlUpdateQuery(tutorial, id)
        sql.query(query,
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
            })
        }
    
    findAll(title, result){
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
        })}
    
    findOne(id, result){
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
    Published(result){
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

    remove(id, result){
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
    removeAll(result){
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
}

const buildSqlUpdateQuery = (inputObject, id) => {
    /**
     * Build sql build query on runtime based on info which needs to be updated
     */
    
    // check what keys are present
    const sqlColumns = ['title', 'description', 'published']
    let subQuery = ''
    for (const key in inputObject) {
        if (Object.hasOwnProperty.call(inputObject, key) && sqlColumns.includes(key)) {
            if(key==='published'){
                subQuery += `${key}=${inputObject[key]},`
            }else{
                subQuery += `${key}='${inputObject[key]}',`
            }        
        }
    }
    return `UPDATE tutorials SET ${subQuery.slice(0, -1)} WHERE id=${id};`
};


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

module.exports = Tutorial
