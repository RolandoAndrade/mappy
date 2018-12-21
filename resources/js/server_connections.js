class ServiceManager
{
    async save(data, dao)
    {
        return await dao.create(data);
    }
    async parseToSave(deliveryAddress, collectionAddress,
                             recipientsName, recipientsSurname)
    {
        const da =await this.save(deliveryAddress,new DeliveryAddressDAO());
        const ca =await this.save(collectionAddress, new CollectionAddressDAO());
        const collectionOrder=new CollectionOrder(1,ca.collection_address_id,
            da.delivery_address_id, recipientsName,recipientsSurname);
        const co=await this.save(collectionOrder,new CollectionOrderDAO());
        for(let i=0;i<packagesToSave.length;i++)
        {
            packagesToSave[i].order=co.collection_order_id;
            const pa=await this.save(packagesToSave[i],new PackageDAO());
        }
        packagesToSave=[];
    }
}

