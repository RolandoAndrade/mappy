class CollectionOrderStrategy
{
    addMarker(data, map)
    {
        try {
            let marker = L.marker([data.deliveryAddress.coordinates.latitude, data.deliveryAddress.coordinates.longitude]).addTo(map);
        marker.on('click',function()
        {
            new InfoOfMarker(data).show();
        });
        return marker;
        }
        catch (e) {
            return "";
        }


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
        const marker=this.strategy.addMarker(data,this.map);
        this.markers.push(marker);
    }

    clearMarkers()
    {
        for (let i=0;i<this.markers.length;i++)
        {
            try
            {
                this.map.removeLayer(this.markers[i]);
            }
            catch (e) {
                console.log(this.markers[i]);
            }

        }
    }

    setView(coordinates)
    {
        this.map.setView([coordinates.latitude, coordinates.longitude], 15);
    }
}


let miniMap=new Map('mapMini', new CoordinatesStrategy());
let myMap=new Map('mapMain', new CollectionOrderStrategy());
miniMap.map.on('click', onMapClick);
myMap.map.on('click',doubleClick);

function onMapClick(e)
{
    let latlng = e.latlng;
    const lat=latlng.lat.toString().substr(0,8);
    const lon=latlng.lng.toString().substr(0,8);
    miniCoords=new Coordinates(parseFloat(lat),parseFloat(lon));
    miniMap.clearMarkers();
    miniMap.addMarker(miniCoords);
}
