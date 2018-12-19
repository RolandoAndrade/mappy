class CollectionAddress
{
	constructor(country, city, line1, line2, zipCode)
	{
		this.country=country;
		this.city=city;
		this.line1=line1;
		this.line2=line2;
		this.zipCode=zipCode;
	}

	equals(collectionAddress)
    {
        return this.country===collectionAddress.country &&
        this.city===collectionAddress.city&&this.line1===collectionAddress.line1&&
        this.line2===collectionAddress.line2&&this.zipCode===collectionAddress.zipCode;
    }
}


class CollectionAddressDAO 
{
    async create(collectionAddress)
    {
        const data = {
            line1: collectionAddress.line1,
            line2: collectionAddress.line2,
            zipCode: collectionAddress.zipCode,
            city: collectionAddress.city,
            country: collectionAddress.country,
        };
        const request=new PostRequest(data,'api/collection_address/create/');
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
    async getAll()
    {
        const request=new GetRequest('api/collection_address/getAll');
        return await request.execute();
    }
}