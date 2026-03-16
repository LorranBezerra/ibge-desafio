# Desafio Técnico – Integração com API de Localidades do IBGE

## 📌 Visão Geral

Este projeto foi desenvolvido como solução para o desafio técnico proposto.
O objetivo é processar um arquivo CSV contendo municípios e suas populações, enriquecer os dados utilizando a API pública de localidades do IBGE e gerar um novo arquivo com informações completas sobre cada município.

Além disso, o programa calcula estatísticas sobre os dados processados e envia essas estatísticas para uma API de correção autenticada utilizando um **ACCESS_TOKEN** obtido via Supabase.

---

# ⚙️ Tecnologias Utilizadas

* Node.js
* JavaScript
* Axios (requisições HTTP)
* csv-parser (leitura de CSV)
* csv-writer (geração de CSV)
* dotenv (variáveis de ambiente)

---

# 📂 Estrutura do Projeto

```
ibge-desafio
│
├── index.js            # Arquivo principal que executa o fluxo completo
├── csvService.js       # Leitura do arquivo CSV de entrada
├── ibgeService.js      # Integração com a API de municípios do IBGE
├── statsService.js     # Cálculo das estatísticas
├── submitService.js    # Envio das estatísticas para a API de correção
│
├── input.csv           # Arquivo de entrada fornecido pelo desafio
├── resultado.csv       # Arquivo gerado pelo programa
│
├── package.json
├── .env.example        # Exemplo de configuração de ambiente
└── README.md
```

---

# 📥 Arquivo de Entrada

O programa utiliza o arquivo `input.csv` fornecido no desafio, contendo:

```
municipio,populacao
Niteroi,515317
Sao Gonçalo,1091737
Sao Paulo,12396372
Belo Horzionte,2530701
Florianopolis,516524
Santo Andre,723889
Santoo Andre,700000
Rio de Janeiro,6718903
Curitba,1963726
Brasilia,3094325
```

---

# 📤 Arquivo de Saída

O programa gera automaticamente o arquivo:

```
resultado.csv
```

Com as colunas:

```
municipio_input
populacao_input
municipio_ibge
uf
regiao
id_ibge
status
```

Status possíveis:

* OK
* NAO_ENCONTRADO
* ERRO_API
* AMBIGUO

---

# 🔎 Processo de Enriquecimento de Dados

O sistema consulta a API pública do IBGE:

https://servicodados.ibge.gov.br/api/v1/localidades/municipios

Para cada município do arquivo de entrada, são obtidos:

* Nome oficial do município
* UF (Unidade Federativa)
* Região
* Código IBGE

---

# 🧠 Lógica de Matching

Para aumentar a precisão na correspondência entre os municípios do arquivo de entrada e os dados da API do IBGE, foi implementada uma etapa de **normalização de texto**, que:

* remove acentos
* converte texto para minúsculo
* reduz inconsistências de escrita

Exemplo:

```
Belo Horzionte → Belo Horizonte
Curitba → Curitiba
```

Essa estratégia melhora a identificação de municípios mesmo quando há pequenas diferenças na grafia.

---

# 📊 Estatísticas Calculadas

Após o processamento dos dados, o sistema calcula:

* total_municipios
* total_ok
* total_nao_encontrado
* total_erro_api
* pop_total_ok
* medias_por_regiao

Exemplo de estrutura enviada para a API de correção:

```json
{
  "stats": {
    "total_municipios": 10,
    "total_ok": 7,
    "total_nao_encontrado": 3,
    "total_erro_api": 0,
    "pop_total_ok": 20000000,
    "medias_por_regiao": {
      "Sudeste": 2500000,
      "Sul": 1800000,
      "Centro-Oeste": 3000000
    }
  }
}
```

---

# 🔐 Autenticação

A autenticação é feita utilizando o sistema de autenticação do Supabase.

O fluxo é:

1. Criação de conta via endpoint `/signup`
2. Confirmação do email
3. Login via endpoint `/token`
4. Obtenção do `ACCESS_TOKEN`

O token é utilizado no envio das estatísticas para a API de correção através do header:

```
Authorization: Bearer ACCESS_TOKEN
```

---

# 🚀 Como Executar o Projeto

### 1️⃣ Clonar o repositório

```
git clone <URL_DO_REPOSITORIO>
cd ibge-desafio
```

---

### 2️⃣ Instalar dependências

```
npm install
```

---

### 3️⃣ Configurar variáveis de ambiente

Criar um arquivo `.env` baseado no `.env.example`:

```
ACCESS_TOKEN=seu_token_aqui
```

---

### 4️⃣ Executar o programa

```
node index.js
```

---

# 📈 Resultado Esperado

Ao executar o programa:

1. O arquivo `input.csv` será lido
2. A API do IBGE será consultada
3. O arquivo `resultado.csv` será gerado
4. Estatísticas serão calculadas
5. Estatísticas serão enviadas para a API de correção
6. O console exibirá:

```
Score: X.XX
Feedback: mensagem da API de correção
```

---

# ⚠️ Tratamento de Erros

O sistema contempla:

* municípios não encontrados
* falhas de comunicação com a API do IBGE
* inconsistências de texto
* tratamento de status para cada linha processada

---

# 📌 Considerações Finais

A solução foi desenvolvida com foco em:

* organização modular do código
* separação de responsabilidades
* tratamento de inconsistências nos dados
* clareza no fluxo de processamento

O projeto pode ser facilmente expandido para lidar com arquivos maiores ou integrar outras fontes de dados.

---

# 🔗 Repositório

Cole aqui o link do repositório GitHub solicitado na entrega:

```
<LINK_DO_REPOSITORIO_GITHUB>
```
