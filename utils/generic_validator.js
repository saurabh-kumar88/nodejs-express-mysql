/**
 * Holds utility functions and methods
 */
const CONST = require("../constants.js")

class GenericValidator{
    constructor(){
     // Todo, complete this constructor   
    }

    validateString(value, fieldName, minLength=1, maxLength=undefined, pattern){
        if(typeof value !== 'string'){
            throw console.log(CONST.ERROR_INVALID_INPUT(fieldName, `Expected a string, got '${typeof value}'`))
        }
            
        else if((minLength > value ) || (maxLength < value)){
            throw console.log(CONST.ERROR_INVALID_INPUT(fieldName, `Invalid length, expected range in '${minLength} to ${maxLength}'`))
        }
        else if(pattern.test(value)){
            throw console.log(CONST.ERROR_INVALID_INPUT(fieldName, `Restricted special chars are - '${pattern}'`))
        }
        return value
    }

    validateInt(value, fieldName){
        if(!(Number.isInteger(value))){
             throw console.log(CONST.ERROR_INVALID_INPUT(fieldName, `Expected a Integer, got - '${typeof value}'`))
        }
        return value
    }

    validateBool(value, fieldName){
        if(typeof value !== 'boolean'){
            throw console.log(CONST.ERROR_INVALID_INPUT(fieldName, `Expected a boolean, got - '${typeof value}'`))
        }
        return value
    }
}

module.exports = GenericValidator