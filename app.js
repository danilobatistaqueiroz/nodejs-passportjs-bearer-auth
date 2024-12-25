const tokens = require('./tokens')

function dashboard(req,res,next){
  res.send('dashboard page')
}

function profile(req,res,next){
  res.send('profile endpoint')
}

function logout (req, res) {
  try {
    console.log("logout",req.headers)
    let token = req.headers.authorization
    token = token.replace('Bearer ', '')
    tokens.access.invalida(token)
    res.status(204).json()
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
}

module.exports = {dashboard, profile, logout}