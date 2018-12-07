class DeliveryAddress {
    constructor(line1, line2, zipCode, city, country, description, longitude, latitude) {
        this.line1 = line1;
        this.line2 = line2;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
        this.description = description;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}

class DeliveryAddressDAO {
    constructor() {

    }
    makeARequest(request,url)
    {
        var dat=JSON.stringify(request);
        console.log(request)
        var getDevices = async () => {
                const location = window.location.hostname;
                const settings = {
                    method: 'POST',
                    body: dat,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                };
                const data = await fetch(url, settings)
                    .then(response => response.json())
                    .then(json => {
                    console.log(json);
                        return json;
                    })
                    .catch(e => {
                    console.log(e);
                        return e
                    });
                console.log(data);
                return data;
        }
        getDevices();
    }

    create(deliveryAddress)
    {
        var data = {
            line1: deliveryAddress.line1,
            line2: deliveryAddress.line2,
            zipCode: deliveryAddress.zipCode,
            city: deliveryAddress.city,
            country: deliveryAddress.country,
            description: deliveryAddress.description,
            longitude: deliveryAddress.longitude,
            latitude: deliveryAddress.latitude,
        };
        return this.makeARequest(data, '../api/delivery_address/create');
    }

    delete(deliveryAddress)
    {

    }
    findById(id)
    {

    }
    
    constructor(line1, line2, zipCode, city, country, description, longitude, latitude)
    {
    }
}