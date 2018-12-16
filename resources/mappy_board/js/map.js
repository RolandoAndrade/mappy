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

    setView(coordinates)
    {
        this.map.setView([coordinates.latitude, coordinates.longitude], 15);
    }
}


var miniMap=new Map('mapMini', new CoordinatesStrategy());
var myMap=new Map('mapMain', new CollectionOrderStrategy());
miniMap.map.on('click', onMapClick);

function onMapClick(e) {
    let latlng = e.latlng;
    let latitude = latlng.lat;
    let longitude = latlng.lng;
    miniMap.clearMarkers();
    miniMap.addMarker(new Coordinates(latitude, longitude));
    $('#latitude').val(latitude);
    $('#longitude').val(longitude);
}
