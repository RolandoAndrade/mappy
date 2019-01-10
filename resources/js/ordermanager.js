class ParserFromJsonToObject
{
    parseCollectionAddress(json)
    {
        const field=json.collection_address_id||json.collection_address;
        try {
            return new CollectionAddress(field.country, field.city,
            field.line1, field.line2, field.zipCode);
        }
        catch (e)
        {
            return new CollectionAddress("","","","","");
        }

    }

    parseDeliveryAddress(json)
    {
        const field=json.delivery_address_id||json.delivery_address;
        let deliveryAddress;
        try {
            deliveryAddress=new DeliveryAddress(field.country, field.city, field.line1,
                field.line2, field.zipCode, field.description);
        deliveryAddress.addCoordinates(new Coordinates(json.delivery_address_id.latitude,
            json.delivery_address_id.longitude));
        }
        catch
        {
            deliveryAddress=new DeliveryAddress("","","","","","");
        }


        return deliveryAddress;
    }

    parseUser(json)
    {

    }

    parsePackage(json)
    {
        return new Package(json.weight, json.description,json.order);
    }
}

class OrderManager
{
    constructor()
    {
        this.myOrders=[];
        this.manager=new CollectionOrderManager();

    }
    async start()
    {
        this.myOrders=await this.manager.getAll();
        if(!this.hasOrders())
        {
            emptyCollectionOrder.show();
        }
        this.showCollectionOrders();
        $(".collection-order-number").text(orderManager.myOrders.length.toString())
    }
    addOrder(order)
    {
        const parser=new ParserFromJsonToObject();
        let newOrder=new CollectionOrder(
            order.collection_order_id,
            parser.parseCollectionAddress(order),
            parser.parseDeliveryAddress(order),
            order.recipientsName, order.recipientsSurname);
        this.setPackagesTo(newOrder, order);
        this.myOrders.push(newOrder);
    }

    setPackagesTo(order,json)
    {
        const parser=new ParserFromJsonToObject();
        for (let i=0;i<json.order.length;i++)
        {
            const p=parser.parsePackage(json.order[i]);
            order.addPackages(p);
        }
    }

    hasOrders()
    {
        return this.myOrders.length>0;
    }

    showCollectionOrders()
    {
        for(let i=0;i<this.myOrders.length;i++)
        {
            new CollectionOrderCard(this.myOrders[i]);
            myMap.addMarker(this.myOrders[i]);
        }
    }

    delete(order)
    {

        for(let i=0;i<this.myOrders.length;i++)
        {

            if(this.myOrders[i].id==order.id)
            {
                this.myOrders.splice(i, 1);
                break;
            }
        }
        this.reset();
    }

    reset()
    {
        myMap.clearMarkers();
        CollectionOrderCard.clear();
        this.showCollectionOrders();
        $(".collection-order-number").text(orderManager.myOrders.length.toString());
    }

    createOrder(order)
    {
        this.myOrders.push(order);
        this.reset();
    }
}

const orderManager=new OrderManager();