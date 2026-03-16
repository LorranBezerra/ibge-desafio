const axios = require("axios")

async function getMunicipiosIBGE() {
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"

    const response = await axios.get(url)

    return response.data
}

module.exports = { getMunicipiosIBGE }