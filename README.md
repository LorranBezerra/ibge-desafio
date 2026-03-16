# Desafio Técnico IBGE

## Tecnologias

Node.js
Axios
CSV Parser

## Fluxo

1. Leitura do arquivo input.csv
2. Consulta da API de localidades do IBGE
3. Matching de municípios com normalização de texto
4. Geração de resultado.csv
5. Cálculo de estatísticas
6. Envio para API de correção usando ACCESS_TOKEN

## Como executar

npm install

node index.js

## Tratamento implementado

- Normalização de acentos
- Case insensitive
- Tratamento de municípios não encontrados
- Estrutura modular