const sql = require("./db")


class Tutorial {
    /**
     *  DB model class, holds all database operations
     */
    constructor(){
        // TODO: add something
    }
    
    static create(newTutorial, result){
        sql.connectionPool.getConnection(function(error, connection){
            if(error){
                console.error(`Unable to created connection with db, reason -> ${error}`)
                return
            }
            connection.query("INSERT INTO tutorials SET?", newTutorial, (err, res) => {
                if(err){
                    console.log(err.message)
                    result(err, null)
                    return;
                }
                console.log("created tutorial : ", { id: res.inserted, ...newTutorial });
                result(null, {id : res.insertedId, ...newTutorial })
            })
        })
    }
    
    static updateById(id, tutorial, result){
        sql.connectionPool.getConnection(function(error, connecton){
            
            if(error){
                console.error(`Unable to created connection with db, reason -> ${error}`)
                return
            }
            let query = buildSqlUpdateQuery(tutorial, id)
            connecton.query(query,
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
            })
        }
    
    static findAll(title, result){
        sql.connectionPool.getConnection(function(error, connection){
            if(error){
                console.error(`Unable to created connection with db, reason -> ${error}`)
                return
            }
            let query = "SELECT * from tutorials";

            if(title){
                query.replace(";", "")
                query += ` WHERE title LIKE '%${title}%';`
            }
            connection.query(query, (err, res) => {
                if(err){
                console.log(err.message)
                result(err, null)
                return;   
                }
                console.log(`tutorials : ${res}`)
                result(null, res)
                })
            })
        
        }
    
    static findOne(id, result){
        sql.connectionPool.getConnection(function(error, connection){
            if(error){
                console.error(`Unable to created connection with db, reason -> ${error}`)
                return
            }
            let query = `SELECT * FROM tutorials WHERE id='${id}';`
        
            connection.query(query, (err, res) => {
                if(err){
                    console.log(err.message)
                    result(err, null)
                    return;   
                }
                console.log(`tutorials : ${res}`)
                result(null, res)
                })
            })
        }

    static Published(result){
        sql.connectionPool.getConnection(function(error, connection){
            if(error){
                console.error(`Unable to created connection with db, reason -> ${error}`)
                return
            }
            let query = "SELECT * from tutorials WHERE published='true'"
            connection.query(query, (err, data) => {
            if(err){
                console.log(err.message)
                result(err, null)
                return;   
            }
            console.log(`tutorials : ${data}`)
            result(null, data)
            })
        })
            
    }

    static remove(id, result){
        sql.connectionPool.getConnection(function(error, connection){
            if(error){
                console.error(`Unable to created connection with db, reason -> ${error}`)
                return
            }
            connection.query(`DELETE FROM tutorials WHERE id=${id};`, (error, data) => {
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
            })
        
        }
    static removeAll(result){
        sql.connectionPool.getConnection(function(error, connection){
            if(error){
                console.error(`Unable to created connection with db, reason -> ${error}`)
                return
            }
            connection.query("DELETE FROM tutorials;", (error, data) => {
                if(error)
                {
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
            })
        
        }
    }

const buildSqlUpdateQuery = (inputObject, id) => {
    /**
     * Build sql build query on runtime based on info which needs to be updated
     * 
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


module.exports = Tutorial
