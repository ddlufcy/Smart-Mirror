const baseURL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/cb31846de76be44c9d83f02f13b380cb/39.7684,-86.1581';

const searchForm = document.querySelector('form');
const apparentTemp = document.getElementById('1');
const cloudCover = document.getElementById('2');
const humidity = document.getElementById('3');
const summary = document.getElementById('4');
const visibility = document.getElementById('5');
const windSpeed = document.getElementById('6');

setInterval(fetchData, 36000); //updates every hour

function fetchData(event) { //fetch data from API
    // event.preventDefault();
    fetch(baseURL)
        .then(data => {
            console.log(data)
            return data.json();
        })
        .then(json => {
            displayData(json);
        })
};
function displayData(json) { //displays weather data
    console.log(json),
        apparentTemp.innerHTML = "Apparent Temp: " + " " + json.currently.apparentTemperature + " &#8457;";
        cloudCover.innerHTML = " Cloud Cover:" + " " + json.currently.cloudCover + " %";
        humidity.innerHTML = "Humidity:" + " " + json.currently.humidity + " %";
        summary.innerHTML = "Current Weather:" + " " + json.currently.summary;
        visibility.innerHTML = "Visibilty:" + " " + json.currently.visibility + " miles";
        windSpeed.innerHTML = "Wind Speed:" + " " + json.currently.windSpeed + " mph";
}
//main time logic
function showTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    m = (m < 10 ? "0" : "") + m;
    s = (s < 10 ? "0" : "") + s;
    document.getElementById('displayTime').innerHTML = h + ":" + m + ":" + s;


    setTimeout(showTime, 1000);
}
showTime();
function showDate() {
    let today = new Date();

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let curWeekDay = days[today.getDay()];
    let curDay = today.getDate();
    let curMonth = months[today.getMonth()];
    let curYear = today.getFullYear();
    let date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
    document.getElementById("displayDate").textContent = date;

    let time = setTimeout(function () { showDate() }, 500);
}
showDate();

// Map
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {

        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 9,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.roadmap,

            disableDefaultUI: true,
        }
        var iconBase = 'https://visualpharm.com/assets/835/Map-595b40b65ba036ed117d480b.svg';
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        var marker = new google.maps.Marker({
            position: latlng,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 1
            },
            map: map
        });

    });
} else {
    var para = document.createElement('p');
    para.textContent = 'Argh, no geolocation!';
    document.body.appendChild(para);
}