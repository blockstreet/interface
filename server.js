var express = require('express')
var nunjucks = require('nunjucks')
var morgan = require('morgan')
var app = express()
var env = require('node-env-file')
var prerender = require('prerender-node')
var robots = require('express-robots')

// Environemnt variables
env(`${__dirname}/.environment`)

// Templating Configuration
nunjucks.configure(__dirname + '/dist/', {
    autoescape: true,
    express: app,
    watch: false
})

// Use prerender service
// https://prerender.io
app.use(prerender.set('prerenderToken', process.env.PRERENDER_TOKEN))

// Robots.txt
app.use(robots(__dirname + '/static/robots.txt'))

// Logging
app.use(morgan('short'))

// Cross Origin Requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    next()
})

// Page routes
app.get('/', (req, res) => res.render('index.html'))
app.get('/news', (req, res) => res.render('index.html'))
app.get('/news/:id', (req, res) => res.render('index.html'))
app.get('/about', (req, res) => res.render('index.html'))
app.get('/ticker', (req, res) => res.render('index.html'))
app.get('/education', (req, res) => res.render('index.html'))
app.get('/education/*', (req, res) => res.render('index.html'))
app.get('/ico', (req, res) => res.render('index.html'))
app.get('/robots.txt', (req, res) => res.render('index.html'))

// Static assets
app.use('/assets', express.static('./source/assets'))
app.use('/static', express.static('./dist/static'))
app.use('/favicon', express.static('./source/assets/favicon'))

// Launch server
app.listen(process.env.PORT, () => {
    console.log('Dashboard process listening on port ' + process.env.PORT + '!')
})
