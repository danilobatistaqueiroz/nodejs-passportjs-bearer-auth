const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const tokens = require('./tokens')
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo')

passport.use(new LocalStrategy ((user, password, done) => {
  console.log('local strategy', user, password);
  if(user=="joker" && password=="joker123456") {
    done(null,{id:'xz', email:"test@example.com",username:"test",createdate:new Date(Date.now())})
  } else {
    done(null, false)
  }
}))

passport.use(new BearerStrategy ((token, done) => {
  try{
    console.log("bearer strategy: ", token);
    const id = tokens.access.verifica(token)
    const usuario = {id:id, email:"test@example.com", username:"test", createdate:new Date(Date.now())}
    done(null,usuario,{token})
  } catch (err) {
    done(err)
  }
}))

passport.use(new JwtCookieComboStrategy({secretOrPublicKey: process.env.CHAVE_JWT}, (payload, done) => {
  console.log('jwtcookiecombo strategy: ', payload);
  const user = {id:payload.id, email:"test@example.com", username:"test", createdate:new Date(Date.now())}
  return done(null, user);
}))

