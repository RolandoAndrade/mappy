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

async function newCollectionOrder()
{

    const collectionAddress= getCollectionAddress();
    const deliveryAddress=await getDeliveryAddress();
    if(deliveryAddress==null)
    {
        return;
    }
    const packages=getPackage();
    $(".loading").show();

    let dao=new CollectionAddressDAO();
    const cA=await dao.create(collectionAddress);
    dao=new DeliveryAddressDAO();
    const dA=await dao.create(deliveryAddress);

    const rName=$("#r_name").val();
    const rSurname=$("#r_surname").val();

    const collectionOrder=new CollectionOrder(0,cA.collection_address_id,
        dA.delivery_address_id,rName,rSurname);

    dao=new CollectionOrderDAO();
    const dO=await dao.create(collectionOrder);

    packages.id=dO.collection_order_id;

    dao=new PackageDAO();
    dao.create(packages);
    $(".loading").hide();
}


function getCollectionAddress()
{
    const combo=document.getElementById("c_country");
    const cCountry=combo.options[combo.selectedIndex].text;
    const cCity=$("#c_city").val();
    const cLine1=$("#c_general").val();
    const cLine2=$("#c_zoom").val();
    const cZip=$("#c_zip").val();
    return new CollectionAddress(cCountry,cCity,cLine1,cLine2,cZip);
}
async function getDeliveryAddress()
{
    const combod=document.getElementById("d_country");
    const dCountry=combod.options[combod.selectedIndex].text;
    const dCity=$("#d_city").val();
    const dLine1=$("#d_general").val();
    const dLine2=$("#d_zoom").val();
    const dZip=$("#d_zip").val();
    const dDescription=$("#d_description").val();
    const latitude=$("#latitude").val();
    const longitude=$("#longitude").val();
    if (latitude===""&&longitude==="")
    {
        await findLocation(dLine1,dLine2);
        return null;
    }
    const da= new DeliveryAddress(dCountry,dCity,dLine1,dLine2,dZip,dDescription);
    da.addCoordinates(new Coordinates(latitude,longitude));
    return da;
}

function getPackage()
{
    const pDescription=$("#p_description").val();
    const pWeight=$("#p_weight").val();
    return new Package(pWeight, pDescription,-1);
}
