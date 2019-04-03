const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = "https://api.darksky.net/forecast/2847ba48ba45c98ab1a3e284d97db425/" + latitude + "," + longitude

    request({url, json:true}, (error,{body})=> {
    
        if(error){
            console.log("Unable to access weather service")
        }else if(body.error){
            console.log("Unable to find location")
        } else {
            callback(undefined,{
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
        
    })
}






module.exports = forecast