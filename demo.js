const validator = require("./utils/generic_validator.js")
const CONST = require("./constants.js")

const obj = new validator()
// console.log(obj.validateString("sasa"))


const inputString = "hello@world"
const pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g
const x = 12.90
console.log(Number.isInteger(x))

