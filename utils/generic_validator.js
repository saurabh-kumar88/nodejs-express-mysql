/**
 * Holds utility functions and methods
 */
const CONST = require("../constants.js")

class GenericValidator{
    constructor(){
     // Todo, complete this constructor   
    }

    validateString(value, fieldName, minLength=1, maxLength=undefined, pattern=''){
        console.log("****** testcode ******", typeof value)
        if(!(value.length))
            throw console.error();
        
        else if(typeof value !== 'stirng')
        {
            let error = CONST.ERROR_INVALID_INPUT('title', 'string')
            throw console.error(error)
        }
            
        // check min, max lenght, if given
        // check pattern, if given

        return value
    }

    validateInt(){
        // TODO: complete it
    }

    validateBool(){
        // TODO: complete it
    }
}

module.exports = GenericValidator