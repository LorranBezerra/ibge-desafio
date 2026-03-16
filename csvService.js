const fs = require("fs")
const csv = require("csv-parser")

function readCSV(file) {
    return new Promise((resolve) => {

        const results = []

        fs.createReadStream(file)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
    })
}

module.exports = { readCSV }