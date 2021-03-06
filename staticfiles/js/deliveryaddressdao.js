class DeliveryAddress extends CollectionAddress
{
	constructor(country, city, line1, line2, zipCode, description)
	{
        super(country, city, line1, line2, zipCode);
        this.country=country;
		this.city=city;
		this.line1=line1;
		this.line2=line2;
		this.zipCode=zipCode;
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
            coordinates: deliveryAddress.coordinates,
        };
        const request=new PostRequest(data,'../api/delivery_address/create');
        return await request.execute();
    }
    delete(collectionAddress)
    {
    }
    findById(id)
    {
    }
    constructor()
    {

    }
}