/**
 * Holds all common constants used in this service
 */
let name= 'sasa'
let type = 'string'
const PASS = 'PASS'
const FAIL = 'FAIL'
const VALID_TUTORIAL_COLUMNS = ['title', 'description', 'published']
const VALID_TITLE_PATTERN = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g
const VALID_DESCRIPTION_PATTERN = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g

const ERROR_INVALID_INPUT = (fieldName, expected) => {
    return `ERROR, Bad input for '${fieldName}', ${expected}`
}

module.exports = {
    VALID_TUTORIAL_COLUMNS,
    VALID_TITLE_PATTERN,
    VALID_DESCRIPTION_PATTERN,
    ERROR_INVALID_INPUT,
    PASS,
    FAIL,
}