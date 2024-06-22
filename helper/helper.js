const fs = require('fs')

function readJsonSchema(shemaName) {
    const schemaFolder = "resource/schema"
    return JSON.parse(fs.readFileSync(`${schemaFolder}/${shemaName}`, 'utf8'))
}

module.exports = readJsonSchema;