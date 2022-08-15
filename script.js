//Complete the Weather API Backend part using openweathermap api
//Google geolocation key AIzaSyCCBx7iHEc8GC145pbrOu-KZJNMbJrXhTw
// OpenWeather API 59af7b8b7dd66b0e4011dc66c1c29214 , 6b4bfdf05d0816386e630c28378a9c3b

toggleCase = str => {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

async function getWeather(latitude, longitude){
    try {
        // let request = "http://api.weatherapi.com/v1/current.json?q="+latitude+","+longitude+"&key=ac07107c937c4f8388f92519222207"
        let request = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=f76906f6e7ebc68e41290f0f0082a00b"
        let weatherData = await (await fetch(request)).json()
        console.log(weatherData)

        document.getElementById("temp").innerText = (parseFloat(weatherData.main.temp) - 273.15).toFixed(2) + " °C"
        document.getElementById("humidity").innerText = weatherData.main.humidity + "%"
        
        document.getElementById("weather").innerText = toggleCase(weatherData.weather[0].description)

    } catch (error) {
        console.log("Could not get temperature")
        console.log(latitude)
        console.log(longitude)
    }
}

async function getLocation(){
    try{
    let place = document.getElementById("place").value
    let request = "https://api.openweathermap.org/geo/1.0/direct?q="+place+"&appid=f76906f6e7ebc68e41290f0f0082a00b"
    let location = await (await fetch (request)).json()

    // console.log(location);
    if(location[0].state == undefined)
        location[0].state = location[0].name
    document.getElementById("city").innerText = location[0].name + ", " + location[0].state + ", " + location[0].country 

    let latitude = location[0].lat
    let longitude = location[0].lon
    
    getWeather(latitude, longitude)
    }
    catch(error){
        document.getElementById("city").innerText = "Unknown Location"
        console.log("Could not fetch location")
    }
}


setCurrentDate = () => {
    const d = new Date();
    switch(d.getMonth()){
        case 0: month = "Jan"
                break 
        case 1: month = "Feb"
                break 
        case 2: month = "Mar"
                break 
        case 3: month = "April"
                break 
        case 4: month = "May"
                break 
        case 5: month = "June"
                break 
        case 6: month = "July"
                break 
        case 7: month = "Aug"
                break 
        case 8: month = "Sept"
                break 
        case 9: month = "Oct"
                break 
        case 10: month = "Nov"
                break 
        case 11: month = "Dec"
                break 
    }
    let date = (d.getDate()).toString()
    document.getElementById("date").innerText = date + " " + month;
}

setCurrentDate()