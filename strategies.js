const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const tokens = require('./tokens')

passport.use(new LocalStrategy ((user, password, done) => {
  if(user=="joker" && password=="joker123456") {
    done(null,{id:1, email:"test@example.com",username:"test",createdate:new Date(Date.now())})
  } else {
    done(null, false)
  }
}))

passport.use(new BearerStrategy ((token, done) => {
  try{
    const id = tokens.access.verifica(token)
    const usuario = {id:id, email:"test@example.com", username:"test", createdate:new Date(Date.now())}
    done(null,usuario,{token})
  } catch (err) {
    done(err)
  }
}))