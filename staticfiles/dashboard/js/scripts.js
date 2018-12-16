var mymap = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        
}).addTo(mymap);

mymap.on('click', onMapClick);

var marker;

function onMapClick(e) {
    var latlng = e.latlng;
    var latitude = latlng.lat;
    var longitude = latlng.lng;

    alert("You clicked the map at " + latitude + '   ' + longitude);

    if(marker){
        mymap.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(mymap);

    document.querySelector('#lat').value = latitude;
    document.querySelector('#lng').value = longitude;
}


window.onload=function(){
    var submit = document.getElementById('submit');
    submit.addEventListener('click', setMarkerWithInput);
}

var setMarkerWithInput = function () {
    var latitude = document.getElementById('lat').value;
    var longitude = document.getElementById('lng').value;

    if(marker){
        mymap.removeLayer(marker);
    }

    if (latitude && longitude){
        marker = L.marker([latitude, longitude]).addTo(mymap);
    }
    else{
        alert("Se necesitan los campos Latitud y longitud"); 
    }
};