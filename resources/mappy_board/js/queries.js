async function setEmail()
{
    const dao=new UserDAO();
    const user = await dao.getUser();
    $('.email-me').text(user.email);
    if(user.image!=null)
    {
        $('.user-image').attr("src","/static/accounts/images"+user.image);
    }

}

async function getAllCollectionOrders()
{
    const dao = new CollectionOrderDAO();
    const collectionOrders=await dao.getAll();
    for(let i=0;i<collectionOrders.length;i++)
    {
        orderManager.addOrder(collectionOrders[i]);
    }
    if(!orderManager.hasOrders())
    {
        emptyCollectionOrder.show();
    }
    orderManager.showCollectionOrders();
    $(".collection-order-number").append(collectionOrders.length.toString())
}

const collectionAddresses=[];
async function getAllCollectionAddresses()
{
    const dao=new CollectionAddressDAO();
    const response=await dao.getAll();
    const addresses=response[0].collection_address;
    for(let i=0;i<addresses.length;i++)
    {
        let t=addresses[i];
        let collectionAddress=new CollectionAddress(t.country,t.city,t.line1,
            t.line2,t.zipCode);
        if(!isRepeatedAddress(collectionAddress,collectionAddresses))
        {
            putInSelect(collectionAddress);
            collectionAddresses.push(collectionAddress);
        }
    }
    $(".collection-address-number").append(collectionAddresses.length.toString());
}

function isRepeatedAddress(address, arr)
{
    for(let i=0;i<arr.length;i++)
    {
        if(address.equals(arr[i]))
            return true;
    }
    return false;
}

function putInSelect(collectionAddress)
{
    $("#select-modal-c").append(
        "<option value='"+collectionAddresses.length+"'>"+
        collectionAddress.line1+"</option>");
    $("#select-create-c").append(
        "<option value='"+collectionAddresses.length+"'>"+
        collectionAddress.line1+"</option>");
}

const deliveryAddresses=[];

async function getAllDeliveryAddresses()
{
    const dao=new DeliveryAddressDAO();
    const response=await dao.getAll();
    const addresses=response[0].delivery_address;
    for(let i=0;i<addresses.length;i++)
    {
        let t=addresses[i];
        let deliveryAddress=new DeliveryAddress(t.country,t.city,t.line1,t.line2,t.zipCode,t.description);
        if(!isRepeatedAddress(deliveryAddress,deliveryAddresses))
        {
            putInSelectDelivery(deliveryAddress);
            deliveryAddresses.push(deliveryAddress);
        }
    }
    $(".delivery-address-number").append(deliveryAddresses.length.toString());
}


function putInSelectDelivery(deliveryAddress)
{
    $("#select-modal-d").append(
        "<option value='"+deliveryAddresses.length+"'>"+
        deliveryAddress.line1+"</option>");
    $("#select-create-d").append(
        "<option value='"+deliveryAddresses.length+"'>"+
        deliveryAddress.line1+"</option>");
}



function fillCollectionAddressesBoxes(form)
{
    let index= $("#select-"+form+"-c").val();
    if(index!="null")
    {
        $("#"+form+"_c_city").val(collectionAddresses[index].city);
        $("#"+form+"_c_line1").val(collectionAddresses[index].line1);
        $("#"+form+"_c_line2").val(collectionAddresses[index].line2);
        $("#"+form+"_c_zipCode").val(collectionAddresses[index].zipCode);
    }
    else
    {
        $("#"+form+"_c_city").val("");
        $("#"+form+"_c_line1").val("");
        $("#"+form+"_c_line2").val("");
        $("#"+form+"_c_zipCode").val("");
    }

}
function fillDeliveryAddressesBoxes(form)
{
    let index= $("#select-"+form+"-d").val();
    if(index!="null")
    {
        $("#"+form+"_d_city").val(deliveryAddresses[index].city);
        $("#"+form+"_d_line1").val(deliveryAddresses[index].line1);
        $("#"+form+"_d_line2").val(deliveryAddresses[index].line2);
        $("#"+form+"_d_zipCode").val(deliveryAddresses[index].zipCode);
        $("#"+form+"_d_description").val(deliveryAddresses[index].description);
    }
    else
    {
        $("#"+form+"_d_city").val("");
        $("#"+form+"_d_line1").val("");
        $("#"+form+"_d_line2").val("");
        $("#"+form+"_d_zipCode").val("");
        $("#"+form+"_d_description").val("");
    }

}