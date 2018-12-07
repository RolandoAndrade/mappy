function initMap(){
    var options = {
        zoom: 8,
        center: {lat:10.4642, lng:-66.9758},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById('map'),options);

    google.maps.event.addListener(map, 'click', function (e) {
 
        var location = e.latLng;
 
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        
        var markerPosition = marker.getPosition();

        setInputs(markerPosition);

        function setInputs(position){
            document.getElementById("lat").value = position.lat();
            document.getElementById("lng").value = position.lng();
        }
        
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Introduzca los datos del paquete</h1>'+
            '<div id="bodyContent">'+
            '<a name="" id="" class="btn btn-primary" href="#" role="button">Hola Moises</a>'
            +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        google.maps.event.addListener(marker, "click", function (e) {
            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            });
            infoWindow.open(map, marker);
        });
    });

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
/*
    document.getElementById('submit').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, infowindow);
      });*/

}
function geocodeLatLng(geocoder, map, infowindow) {
    var latitude = document.getElementById('lat').value;
    var longitude = document.getElementById('lng').value;
    var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(15);
                var marker = new google.maps.Marker({
                position: latlng,
                map: map
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
            window.alert('No se encontro nada en esa posicion');
            }
        } else {
          window.alert('Se necesitan los campos Latitud y longitud: ' + status);
        }
    });
}
