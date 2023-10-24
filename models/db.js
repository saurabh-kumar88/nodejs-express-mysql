const mysql = require("mysql")
const dbConfig = require("../db_config/db.config")

const connectionPool  = mysql.createPool({
    connectionLimit: 100,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

connectionPool.getConnection(error => {
    if(error){
        throw error
    }
    else{
     console.log(`Successfully connected to - ${dbConfig.DB}`)
    } 
})

module.exports = {
    connectionPool,
    
}
