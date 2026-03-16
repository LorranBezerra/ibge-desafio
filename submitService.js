const axios = require("axios")

async function enviarStats(stats, token) {

    const url = "https://mynxlubykylncinttggu.functions.supabase.co/ibge-submit"

    const response = await axios.post(
        url,
        { stats },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )

    console.log("Score:", response.data.score)
    console.log("Feedback:", response.data.feedback)

}

module.exports = { enviarStats }