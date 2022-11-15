const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const passport = require('passport')
const passportConfig = require('./config/passport')
const session = require('express-session')
const connectDB = require('./config/db')

//load config
dotenv.config({ path: './config/config.env'})

//passport config, passes the passport object from line 6 into the function (passport strategy)
passportConfig(passport)

//calls connectDB from db.js - connects to database
connectDB()
//initialize app
const app = express();

//if we're in dev mode, use morgan which will log requests
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

//Passport middleware
app.use(passport.initialize);
app.use(passport.session)

//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))