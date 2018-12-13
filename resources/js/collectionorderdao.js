class CollectionOrder
{
	constructor(id, collectionAddress, deliveryAddress, recipientsName, recipientsSurname)
	{
	    this.id=id;
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

    getPackagesResume()
    {
        let ret="";
        for(let i=0;i<this.packages.length;i++)
        {
            ret+=this.packages[i].description+", ";
        }
        return ret.substr(0,ret.length-2);
    }

    getWeight()
    {
        let ret=0;
        for(let i=0;i<this.packages.length;i++)
        {
            ret+=parseFloat(this.packages[i].weight);
        }
        return ret;
    }

    async delete()
    {
        let dao=new CollectionOrderDAO();
        return await dao.delete(this);
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
        return await request.execute();
    }

    async delete(collectionOrder)
    {
        const request=new DeleteRequest('api/collection_order/remove',collectionOrder.id)
        return await request.execute();
    }
    findById(id)
    {
    }
    constructor()
    {

    }
}

async function deleteOrder(collectionOrder)
{
    const swal=new SwalModal(
        '¿Estás seguro?',
	    'La orden de recolección será eliminada',
	    'warning',
	    true,
        '#F44336',
	    '#DC8502',

	    'Sí, ¡quiero eliminarla!',
	    'No, cancelar!',
        async function () {
	    		await continueDeleteOrder(collectionOrder);
	    }
    );
    swal.show();

}
async function continueDeleteOrder(collectionOrder)
{
    const dao=new CollectionOrderDAO();
    const response= await dao.delete(collectionOrder);
    if(response=="Deleted")
    {
        orderManager.delete(collectionOrder);
    }

}



