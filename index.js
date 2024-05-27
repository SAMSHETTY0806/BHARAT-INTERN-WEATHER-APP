var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#city');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var apik = 'e9562dd81852252e1433d23554ea85fa';

function conversion(val) {
    return (val - 273.15).toFixed(2);  // Convert Kelvin to Celsius and round to 2 decimal places
}

btn.addEventListener('click', function() {
    var cityName = inputvalue.value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apik}&lang=en`;

    console.log("Fetching data from URL: " + url); // Debugging log

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log("Data fetched successfully:", data); // Debugging log

            var nameval = data.name;
            var descrip = data.weather[0].description;
            var temperature = data.main.temp;
            var wndspeed = data.wind.speed;

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(temperature)}°C</span>`;
            description.innerHTML = `Sky Conditions: <span>${descrip}</span>`;
            wind.innerHTML = `Wind Speed: <span>${wndspeed} km/h</span>`;
        })
        .catch(err => {
            console.error("Fetch error: ", err); // Debugging log
            alert('You entered the wrong city name.');
        });
});