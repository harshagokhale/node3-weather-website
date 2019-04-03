const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harsha'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Harsha'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Weather App',
        helpText: 'Sample Help Text',
        name: 'Harsha'
    })
})



app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must specify address option'            
        })        
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {

        if(error){
            return console.log(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            res.send({
                forecast: 'It is currently ' + forecastData.temperature + '. Chances of rain ' 
                + forecastData.precipProbability + '%',
                location: location,
                address: req.query.address
            })
          })
    })

    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must specify search option'            
        })        
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('help-error', {
        title: 'Weather App',
        errorText: 'Help Article not found',
        name: 'Harsha'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Weather App',
        errorText: 'Page not found',
        name: 'Harsha'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})