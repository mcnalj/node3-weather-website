const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWNuYWxqIiwiYSI6ImNrOWl5eHdkbjFlemUzZnF0bW8zMmZwamoifQ.2vK9DDyD2PcYEVu5VoHD4Q'

    request({url, json:true}, (error, response) =>{
        if (error) {
            callback("Unable to access location services.", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Please try another search.", undefined)
        } else {
            callback(undefined, {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode