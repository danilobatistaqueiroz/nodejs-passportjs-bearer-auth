const passport = require('passport')
const tokens = require('./tokens')

module.exports = {
  local (req,res,next) {
    passport.authenticate('local', {session:false,failureRedirect:'/usuario/login'},(err,user,info)=>{
    if(err) return res.redirect('/usuario/login')
    const accessToken = tokens.access.cria(user.id)
    res.set('Authorization', accessToken)
    res.authenticated = true
    return next()
    })(req,res,next)
  },

  bearer (req,res,next) {
    passport.authenticate('bearer', (err, user, info) => {
      if(err) return res.redirect('/usuario/login')
      req.user = user
      res.set('Authorization', info.token)
      res.authenticated = true
      return next()
    })(req, res, next)
  }

}