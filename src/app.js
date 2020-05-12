const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Jake'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Jake McNally'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message:'This is helpful',
        title:'Help',
        name:'Jake McNally'
    })
})

app.get('', (req, res) => {
    res.send('Hello Express!');
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error:"You must enter a location"
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = { }) => {
            if (error) {
                return res.send({error})
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                } 

                res.send({
                    forecast:forecastData,
                    location,
                    address:res.req.address
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name:'Jake McNally',
        title: '404 help',
        error_message:'Help page does not exist.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:"404 page",
        name:"Jake McNally",
        error_message: "404 page not found."
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port " + port + ".")
})

