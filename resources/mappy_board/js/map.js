class CollectionOrderStrategy
{
    addMarker(data, map)
    {
        let marker = L.marker([data.deliveryAddress.coordinates.latitude, data.deliveryAddress.coordinates.longitude]).addTo(map);
        marker.on('click',function()
        {
            new InfoOfMarker(data).show();
        });
        return marker;
    }

}

class CoordinatesStrategy
{
    addMarker(data, map)
    {
        let marker = L.marker([data.latitude, data.longitude]).addTo(map)
        return marker;
    }

}

class Map
{
    constructor(container, strategy)
    {
        this.map = L.map(container).setView([10.4642, -66.9758], 15);
        this.strategy=strategy;
        this.markers = [];
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
}).addTo(this.map);
    }

    addMarker(data)
    {
        this.markers.push(this.strategy.addMarker(data,this.map));
    }

    clearMarkers()
    {
        for (let i=0;i<this.markers.length;i++)
        {
            this.map.removeLayer(this.markers[i]);
        }
    }
}



var myMap=new Map('mapMain', new CollectionOrderStrategy());

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