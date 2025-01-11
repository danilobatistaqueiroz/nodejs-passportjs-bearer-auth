const passport = require('passport')
const tokens = require('./tokens')

module.exports = {

  local (req,res,next) {
    passport.authenticate('local', {session:false,failureRedirect:'/usuario/login'},(err,user,info,status)=>{
      console.log('localauth',err,user,info,status);
      if(err) return res.redirect('/usuario/login')
      if (!user) return res.redirect('/usuario/login')
      if (info?.message === "Missing credentials") return res.redirect('/usuario/login')
      if ([400,401,402,403].includes(status)) return res.redirect('/usuario/login')
      const accessToken = tokens.access.cria(user.id)
      res.set('Authorization', 'Bearer '+ accessToken)
      res.authenticated = true
      return next()
    })(req,res,next)
  },

  bearer (req,res,next) {
    passport.authenticate('bearer', {session:false,failureRedirect:'/usuario/login'}, (err, user, info, status) => {
      console.log('bearerauth-info', info);
      console.log('bearerauth-user', user);
      console.log('bearerauth-err', err);
      console.log('bearerauth-status', status)
      if(err) return res.redirect('/usuario/login')
      res.set('Authorization', 'Bearer '+ info.token)
      res.authenticated = true
      return next()
    })(req, res, next)
  },

  localCookie (req,res,next) {
    passport.authenticate('local', {session:false,failureRedirect:'/usuario/login'},(err,user,info,status)=>{
      console.log('cookieauth',err,user,info,status);
      if(err) return res.redirect('/usuario/login')
      if (!user) return res.redirect('/usuario/login')
      if (info?.message === "Missing credentials") return res.redirect('/usuario/login')
      if ([400,401,402,403].includes(status)) return res.redirect('/usuario/login')
      const accessToken = tokens.access.cria(user.id)
      res.cookie('jwt', accessToken, {
        httpOnly: true,
        sameSite: true,
        signed: true,
        secure: true
      });
      res.authenticated = true
      return next()
    })(req,res,next)
  },

  bearerCookie (req,res,next) {
    passport.authenticate('jwt-cookiecombo', {session:false,failureRedirect:'/usuario/login'}, (err, user, info, status) => {
      console.log('cookiecombo-info', info);
      console.log('cookiecombo-user', user);
      console.log('cookiecombo-err', err);
      console.log('cookiecombo-status', status)
      if(err) return res.redirect('/usuario/login')
      res.authenticated = true
      return next()
    })(req, res, next)
  },

}