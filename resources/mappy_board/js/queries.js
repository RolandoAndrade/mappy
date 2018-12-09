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
    myOrders.push(new CollectionOrder(collectionAddress,deliveryAddress,
        order.recipientsName, order.recipientsSurname));
}

async function getAllCollectionOrders()
{
    const dao = new CollectionOrderDAO();
    const collectionOrders=await dao.getAll();
    for(let i=0;i<collectionOrders.length;i++)
    {
        addOrder(collectionOrders[i]);
    }
    for(let i=0;i<myOrders.length;i++)
    {
        const coord=myOrders[i].deliveryAddress.coordinates;
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