class Map
{
    constructor(container)
    {
        this.map = L.map(container).setView([10.4642, -66.9758], 15);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
}).addTo(this.map);
    }

    addMarker(order)
    {
        let marker = L.marker([order.deliveryAddress.coordinates.latitude, order.deliveryAddress.coordinates.longitude]).addTo(this.map);
        marker.on('click',function()
        {
            new InfoOfMarker(order).show();
		});
    }
}



var myMap=new Map('mapMain');

/*var mymap = L.map('mapMain').setView([10.4642, -66.9758], 15);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
}).addTo(mymap);

//mymap.on('click', onMapClick);

//map.invalidateSize();

var marker;

function onMapClick(e) {
    var latlng = e.latlng;
    var latitude = latlng.lat;
    var longitude = latlng.lng;

    console.log("You clicked the map at " + latitude + '   ' + longitude);

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
        console.log("Se necesitan los campos Latitud y longitud");
    }
};*/