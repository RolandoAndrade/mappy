async function setEmail()
{
    const manager = new AuthManager();
    const user = await manager.me();
    $('.email-me').text(user.email);
    if(user.image!=""&&user.image!=null)
    {
        $('.user-image').attr("src",user.image);
    }
    updateProfileStats(user);

}
function updateProfileStats(user)
{
    const s=user.firstName+" "+user.firstSurname;
    $("#username-stat").empty();
    $("#username-stat").append(s);
    $("#user_first_name").val(user.firstName);
    $("#user_second_name").val(user.secondName);
    $("#user_first_surname").val(user.firstSurname);
    $("#user_second_surname").val(user.secondSurname);
}

async function getAllCollectionOrders()
{
    await orderManager.start();
}

let collectionAddresses=[];
async function getAllCollectionAddresses()
{
    const manager=new CollectionAddressManager();
    collectionAddresses= await manager.getAll();
    for(let i=0;i<collectionAddresses.length;i++)
    {
        putInSelect(collectionAddresses[i],i);
    }
    $(".collection-address-number").text(collectionAddresses.length.toString());
}

function putInSelect(collectionAddress, i)
{
    $("#select-modal-c").append(
        "<option value='"+i+"'>"+
        collectionAddress.line1+"</option>");
    $("#select-create-c").append(
        "<option value='"+i+"'>"+
        collectionAddress.line1+"</option>");
}

let deliveryAddresses=[];

async function getAllDeliveryAddresses()
{
    const manager=new DeliveryAddressManager();
    deliveryAddresses=await manager.getAll();
    for(let i=0;i<deliveryAddresses.length;i++)
        putInSelectDelivery(deliveryAddresses[i],i);
    $(".delivery-address-number").text(deliveryAddresses.length.toString());
}


function putInSelectDelivery(deliveryAddress,i)
{
    $("#select-modal-d").append(
        "<option value='"+i+"'>"+
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