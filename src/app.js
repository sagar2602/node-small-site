const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const express = require('express')

const app = express()

//Defining paths for express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialsDirPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('',(req,res) => {
// res.send('Welcm guys to express world')
// })
//NOTE ---> Replace above static commented code of sending response of static homepage to render dynamic and templating content as follows
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: ' sagar',
        text: 'Created By '
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help!',
        name: 'sagar',
        text: 'Created By '
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About!',
        name: 'sagar',
        text: 'Created By '
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Provide address to get results'
        })
    }
    geocode(req.query.address, (error,{latitude , longitude , location} = {}) => {
        if(error){
            return res.send({error})
        }
        // console.log(data)
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({error})
          }

          res.send({
            location,
            forecast: forecastData,
            address: req.query.address
        })
        })
      })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Search something to get results'
        })
    }
    console.log(req.query)
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name: 'Sags',
        errorMsg: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name: 'SagsV',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server running on 3000 port')
})