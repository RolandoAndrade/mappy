class CollectionOrder
{
	constructor(collectionAddress, deliveryAddress, recipientsName, recipientsSurname)
	{
	    this.packages=[];
		this.collectionAddress=collectionAddress;
		this.deliveryAddress=deliveryAddress;
		this.recipientsName=recipientsName;
		this.recipientsSurname=recipientsSurname;
	}

	addPackages(packages)
    {
        this.packages.push(packages);
    }
}

class CollectionOrderDAO
{
    async create(collectionOrder)
    {
        const data = {
            user_id: null,
            collection_address: collectionOrder.collectionAddress,
            delivery_address: collectionOrder.deliveryAddress,
            recipientsName: collectionOrder.recipientsName,
            recipientsSurname: collectionOrder.recipientsSurname,
        };
        const request=new PostRequest(data,'api/collection_order/create/');
        return await request.execute();
    }
    async getAll()
    {
        const request=new GetRequest('api/collection_order/getAll');
        return request.execute();
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