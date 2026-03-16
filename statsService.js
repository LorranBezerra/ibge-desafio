function calcularStats(resultados) {

    const stats = {
        total_municipios: resultados.length,
        total_ok: 0,
        total_nao_encontrado: 0,
        total_erro_api: 0,
        pop_total_ok: 0,
        medias_por_regiao: {}
    }

    const regioes = {}

    resultados.forEach(r => {

        if (r.status === "OK") {

            stats.total_ok++
            stats.pop_total_ok += Number(r.populacao_input)

            if (!regioes[r.regiao]) {
                regioes[r.regiao] = { soma: 0, count: 0 }
            }

            regioes[r.regiao].soma += Number(r.populacao_input)
            regioes[r.regiao].count++

        } else if (r.status === "NAO_ENCONTRADO") {
            stats.total_nao_encontrado++
        } else if (r.status === "ERRO_API") {
            stats.total_erro_api++
        }

    })

    for (const regiao in regioes) {
        stats.medias_por_regiao[regiao] =
            regioes[regiao].soma / regioes[regiao].count
    }

    return stats
}

module.exports = { calcularStats }