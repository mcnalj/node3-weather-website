const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const apiKey = "access_key=020844832e0c0a75b0230acb0dba36cd"
    const urlBase = 'http://api.weatherstack.com/current?' 
//    const location = '&query=37.8267,-122.4233&units=f'
    const location = '&query=' + latitude + ',' + longitude +'&units=f'
    const url = urlBase + apiKey + location
    
    request({url, json:true}, (error, {body}) => {
        const {temperature, feelslike} = body.current
        if (error) {
            callback("Unable to access forecast services.", undefined)
        } else if (body.current.length === 0) {
            callback("Unable to find forecast. Please try another search.", undefined)
        } else {
            callback(undefined, {
//                temperature:response.body.current.temperature,
//                feelslike:response.body.current.feelslike
                temperature,
                feelslike
            })
        }
    })
}

module.exports = forecast
