class Coordinates
{
    constructor(latitude, longitude)
    {
        this.latitude=latitude;
        this.longitude=longitude;
    }
}

var coords=new Coordinates(0,0);
var miniCoords=null;

class DeliveryAddress extends CollectionAddress
{
	constructor(country, city, line1, line2, zipCode, description)
	{
        super(country, city, line1, line2, zipCode);
		this.description=description;
		this.coordinates=null;
	}

	addCoordinates(coordinates)
    {
        this.coordinates=coordinates;
    }
}

class DeliveryAddressDAO
{
    async create(deliveryAddress)
    {
        const data = {
            line1: deliveryAddress.line1,
            line2: deliveryAddress.line2,
            zipCode: deliveryAddress.zipCode,
            city: deliveryAddress.city,
            country: deliveryAddress.country,
            description: deliveryAddress.description,
            latitude: deliveryAddress.coordinates.latitude,
            longitude: deliveryAddress.coordinates.longitude,
        };
        const request=new PostRequest(data,'api/delivery_address/create');
        return await request.execute();
    }
    delete(collectionAddress)
    {
    }
    findById(id)
    {
    }

    async getAll()
    {
        const request=new GetRequest('api/delivery_address/getAll');
        return await request.execute();
    }
    constructor()
    {

    }
}