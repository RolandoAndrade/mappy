class Package
{
	constructor(weight, description, order)
	{
		this.weight=weight;
		this.description=description;
		this.order=order;
	}
}

class PackageDAO
{
    async create(APackage)
    {
        const data = {
            weight: APackage.weight,
            description: APackage.description,
            order: APackage.order,
        };
        const request=new PostRequest(data,'api/package/create/');
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

var packagesToSave=[];