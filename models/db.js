const mysql = require("mysql")
const dbConfig = require("../db_config/db.config")

// create connection to db
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

// const pool  = mysql.createPool({
//     connectionLimit: 100,
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// })

connection.connect(error => {
    if(error) throw error
    console.log(`Successfully connected to - ${dbConfig.DB}`)
})



// testcode
// pool.getConnection(function(err, connection){
//     if(err){
//         console.log(`Unable to created connection with db, reason -> ${err}`)
//     }
//     connection.query("SHOW DATABASES;", function(error, results, fields){
//         if(error){
//             console.log(`Unbale to complete query, reaso -> ${error}`)
//         }
//         console.log(`SELECT * FROM nodejs_db.tutorials; : ${results}`)
//         connection.destroy()
//     })

// })

module.exports = connection;