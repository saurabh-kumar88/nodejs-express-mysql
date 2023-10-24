/**
 * Common constants used in this service
 */
const PASS = 'PASS'
const FAIL = 'FAIL'
const VALID_TUTORIAL_COLUMNS = ['title', 'description', 'published']
const VALID_TITLE_PATTERN = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g
const VALID_DESCRIPTION_PATTERN = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g
const BD_ERROR = "Request cannot be completed due to conflict with current state!"

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
    BD_ERROR,
}