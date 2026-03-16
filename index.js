const { readCSV } = require("./csvService")
const { getMunicipiosIBGE } = require("./ibgeService")
const { calcularStats } = require("./statsService")
const { enviarStats } = require("./submitService")

const createCsvWriter = require('csv-writer').createObjectCsvWriter

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsImtpZCI6ImR0TG03UVh1SkZPVDJwZEciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL215bnhsdWJ5a3lsbmNpbnR0Z2d1LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkOTk4MDI2OC01MWJmLTQ3NDgtYmYzMy02ZmM0MjQyNGE1OGYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzczNjk3NjkyLCJpYXQiOjE3NzM2OTQwOTIsImVtYWlsIjoicm9kcmlndWVzYnJvbWVuQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJyb2RyaWd1ZXNicm9tZW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5vbWUiOiJMb3JyYW4gUm9kcmlndWVzIEJlemVycmEiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImQ5OTgwMjY4LTUxYmYtNDc0OC1iZjMzLTZmYzQyNDI0YTU4ZiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzczNjk0MDkyfV0sInNlc3Npb25faWQiOiJiNTQ4ODk0Ny1jOTFjLTRjMzktOTZjZS1hYTM2Y2QyMDExOWUiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.Jq0E5IrqTEMmXL6cixndDk8QXtptOjxeoRLVe5kTqZ4"

function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

async function main() {

    const input = await readCSV("input.csv")

    const municipiosIBGE = await getMunicipiosIBGE()

    const resultados = []

    for (const linha of input) {

        const nomeInput = normalize(linha.municipio)

        const match = municipiosIBGE.find(m =>
            normalize(m.nome) === nomeInput
        )

        if (match) {

            resultados.push({
                municipio_input: linha.municipio,
                populacao_input: linha.populacao,
                municipio_ibge: match.nome,
                uf: match.microrregiao.mesorregiao.UF.sigla,
                regiao: match.microrregiao.mesorregiao.UF.regiao.nome,
                id_ibge: match.id,
                status: "OK"
            })

        } else {

            resultados.push({
                municipio_input: linha.municipio,
                populacao_input: linha.populacao,
                municipio_ibge: "",
                uf: "",
                regiao: "",
                id_ibge: "",
                status: "NAO_ENCONTRADO"
            })

        }

    }

    const writer = createCsvWriter({
        path: "resultado.csv",
        header: [
            { id: 'municipio_input', title: 'municipio_input' },
            { id: 'populacao_input', title: 'populacao_input' },
            { id: 'municipio_ibge', title: 'municipio_ibge' },
            { id: 'uf', title: 'uf' },
            { id: 'regiao', title: 'regiao' },
            { id: 'id_ibge', title: 'id_ibge' },
            { id: 'status', title: 'status' }
        ]
    })

    await writer.writeRecords(resultados)

    const stats = calcularStats(resultados)

    console.log("Estatísticas:", stats)

    await enviarStats(stats, ACCESS_TOKEN)

}

main()