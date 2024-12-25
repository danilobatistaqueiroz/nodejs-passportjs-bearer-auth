const jwt = require('jsonwebtoken')
const blocklistAccessToken = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1MTUzMjUzLCJleHAiOjE3MzUxNTQxNTN9.99uoKhxkSKVmZRGSXrW7em2YO4GztE_f3hHTEgCKAWI']

function criaTokenJWT (id, [tempoQuantidade, tempoUnidade]) {
  const payload = { id }
  const token = jwt.sign(payload, process.env.CHAVE_JWT, {
    expiresIn: tempoQuantidade + tempoUnidade
  })
  return token
}

function verificaTokenJWT (token, nome, blocklist) {
  verificaTokenNaBlocklist(token, nome, blocklist)
  const { id } = jwt.verify(token, process.env.CHAVE_JWT)
  return id
}

function verificaTokenNaBlocklist (token, nome, blocklist) {
  fault(blocklist)
  if (!blocklist) {
    return
  }
  const tokenNaBlocklist = blocklist.includes(token)
  if (tokenNaBlocklist) {
    throw new jwt.JsonWebTokenError(`${nome} inválido por logout!`)
  }
}

function invalidaTokenJWT (token, blocklist) {
  return blocklist.push(token)
}

module.exports = {
  access: {
    nome: 'access token',
    lista: blocklistAccessToken,
    expiracao: [15, 'm'],
    cria (id) {
      return criaTokenJWT(id, this.expiracao)
    },
    verifica (token) {
      return verificaTokenJWT(token, this.nome, this.lista)
    },
    invalida (token) {
      return invalidaTokenJWT(token, this.lista)
    }
  },
}
