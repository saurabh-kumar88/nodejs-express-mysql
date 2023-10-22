/**
 * Holds all common constants used in this service
 */
let name= 'sasa'
let type = 'string'
const VALID_TUTORIAL_COLUMNS = ['title', 'description', 'published']

const ERROR_INVALID_INPUT = (fieldName, fieldType) => {
    console.log(fieldName, fieldType)
    return `ERROR, Bad input for '${fieldName}', expected a type of '${fieldType}'`
}

module.exports = {
    VALID_TUTORIAL_COLUMNS,
    ERROR_INVALID_INPUT,
}