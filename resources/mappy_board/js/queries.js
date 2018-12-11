async function setEmail()
{
    const dao=new UserDAO();
    const user = await dao.getUser();
    $('.email-me').text(user.email);
}
var myOrders=[];

function addOrder(order)
{
    const ca=order.collection_address_id;
    const collectionAddress= new CollectionAddress(ca.country, ca.city,
            ca.line1, ca.line2, ca.zipCode);
    const da=order.delivery_address_id;
    const deliveryAddress= new DeliveryAddress(da.country, da.city, da.line1,
            da.line2, da.zipCode, da.description);
    deliveryAddress.addCoordinates(new Coordinates(da.latitude, da.longitude));
    let newOrder=new CollectionOrder(order.collection_order_id, collectionAddress,deliveryAddress,
        order.recipientsName, order.recipientsSurname);
    for (let i=0;i<order.order.length;i++)
    {
        const APackage=order.order[i];
        const p=new Package(APackage.weight, APackage.description,APackage.order);
        newOrder.addPackages(p);
    }

    myOrders.push(newOrder);
}

async function getAllCollectionOrders()
{
    const dao = new CollectionOrderDAO();
    const collectionOrders=await dao.getAll();
    for(let i=0;i<collectionOrders.length;i++)
    {
        addOrder(collectionOrders[i]);
    }
    if(myOrders.length===0)
    {
        emptyCollectionOrder.show();
    }
    for(let i=0;i<myOrders.length;i++)
    {
        const coord=myOrders[i].deliveryAddress.coordinates;
        new CollectionOrderCard(myOrders[i]);
        mainMap.addMarker(coord);
    }
}


class Map
{
    addMarker(coordinates)
    {
        L.marker([coordinates.latitude, coordinates.longitude]).addTo(mymap);
    }
}
var mainMap=new Map();