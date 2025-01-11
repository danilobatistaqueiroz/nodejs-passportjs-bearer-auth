const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {dashboard,profile,logout}=require('./app')
require('./console-colors')
const cookieParser = require('cookie-parser')
app.use(cookieParser('StRoNGs3crE7'))

require('./strategies')
const {bearerCookie,localCookie} = require('./auths')
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});

app.get("/usuario/login", (req,res,next) => { res.send("login page") })

app.post ("/usuario/login", localCookie, profile)

app.get('/profile', bearerCookie, profile)

app.get('/dashboard', bearerCookie, dashboard)


app.post('/usuario/logout', logout)

/****************************** se passa username and password no request headers authorization basic ******************************* */
app.listen(3000, () => console.log(`app is now running on port 3000`))
