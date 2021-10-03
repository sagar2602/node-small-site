const request = require('request')

const forecast = (lat,long,callback) => {
    // console.log(lat)
    // console.log(long)
    const url = 'http://api.weatherstack.com/current?access_key=df4ff8f5b7f2d0a18df6bd19e2104300&query=' + lat +','+ long;
    // console.log(url)
    request({ url, json: true}, (error, {body}) => {
      if(error){
        callback('Unable to connect to internet thats why having error unable to connect to location services',undefined)
      }
      else if(body.error){
          console.log(body.error)
        callback('Unable to find location --> incorrect latitude or longitude', undefined)
      }
      else{
        callback(undefined , body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out and it feels like ' + body.current.feelslike)
      }
    }
    
    )
    }

    module.exports = forecast