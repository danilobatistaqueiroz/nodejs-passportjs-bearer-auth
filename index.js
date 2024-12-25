const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {dashboard,profile,logout}=require('./app')
require('./console-colors')

require('./strategies')
const {bearer,local} = require('./auths')
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/usuario/login", (req,res,next) => { res.send("login page") })

app.post ("/usuario/login", local, profile)

app.get('/profile', bearer, profile)

app.get('/dashboard', bearer, dashboard)


app.post('/usuario/logout', logout)

/****************************** se passa username and password no request headers authorization basic ******************************* */
app.listen(3000, () => console.log(`app is now running on port 3000`))
