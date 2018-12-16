class CollectionOrder
{
	constructor(collectionAddress, deliveryAddress, recipientsName, recipientsSurname, zipCode)
	{
	    this.APackage=null;
		this.collectionAddress=collectionAddress;
		this.delivery_address=deliveryAddress;
		this.recipientsName=recipientsName;
		this.recipientsSurname=recipientsSurname;
	}
}

class CollectionOrderDAO
{
    async create(collectionOrder)
    {
        const data = {
            user_id: null,
            collection_address: collectionOrder.collectionAddress,
            delivery_address: collectionOrder.delivery_address,
            zipCode: collectionOrder.zipCode,
            city: collectionOrder.city,
            country: collectionOrder.country,

        };
        const request=new PostRequest(data,'../api/collection_address/create/');
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