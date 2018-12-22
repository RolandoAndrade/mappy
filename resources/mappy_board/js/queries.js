async function setEmail()
{
    const dao=new UserDAO();
    const user = await dao.getUser();
    $('.email-me').text(user.email);
    if(user.image!=null)
    {
        $('#user-image').attr("src","/static/accounts/images"+user.image);
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



function fillCollectionAddressesBoxes()
{
    let index= $("#select-modal-c").val();
    if(index!="null")
    {
        $("#modal_c_city").val(collectionAddresses[index].city);
        $("#modal_c_line1").val(collectionAddresses[index].line1);
        $("#modal_c_line2").val(collectionAddresses[index].line2);
        $("#modal_c_zipCode").val(collectionAddresses[index].zipCode);
    }
    else
    {
        $("#modal_c_city").val("");
        $("#modal_c_line1").val("");
        $("#modal_c_line2").val("");
        $("#modal_c_zipCode").val("");
    }

}
function fillDeliveryAddressesBoxes()
{
    let index= $("#select-modal-d").val();
    if(index!="null")
    {
        $("#modal_d_city").val(deliveryAddresses[index].city);
        $("#modal_d_line1").val(deliveryAddresses[index].line1);
        $("#modal_d_line2").val(deliveryAddresses[index].line2);
        $("#modal_d_zipCode").val(deliveryAddresses[index].zipCode);
        $("#modal_d_description").val(deliveryAddresses[index].description);
    }
    else
    {
        $("#modal_d_city").val("");
        $("#modal_d_line1").val("");
        $("#modal_d_line2").val("");
        $("#modal_d_zipCode").val("");
        $("#modal_d_description").val("");
    }

}