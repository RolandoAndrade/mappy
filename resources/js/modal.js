function doubleClick(e)
{
    $(".modal-screen").fadeIn(300);
    $(".modal-card").fadeIn(300);
    $('.expandible.a').hide();
    $('.expandible.b').hide();
    $('.more-modal.a i').removeClass("zmdi-plus");
    $('.more-modal.a i').removeClass("zmdi-minus");
    $('.more-modal.a i').addClass("zmdi-plus");
    $('.more-modal.b i').removeClass("zmdi-plus");
    $('.more-modal.b i').removeClass("zmdi-minus");
    $('.more-modal.b i').addClass("zmdi-plus");
    let latlng = e.latlng;
    coords.latitude= parseFloat(latlng.lat.toString().substr(0,8));
    coords.longitude = parseFloat(latlng.lng.toString().substr(0,8));
}
$(".modal-screen").click(function (event)
{
   if(!$(event.target).closest(".modal-card").length && !$(event.target).is(".modal-card"))
   {
       exitModal()
   }
});

function exitModal()
{
    $(".modal-card").fadeOut(300);
    $(".modal-screen").fadeOut(300);
}

$(".close-modal").click(exitModal);

function newForm(form)
{
    if(!$('.expandible.'+form).is(":visible"))
    {
        $('.expandible.'+form).show(300);
        $('.more-modal.'+form+" i").removeClass("zmdi-plus");
        $('.more-modal.'+form+ " i").addClass("zmdi-minus");
    }
    else
    {
        $('.expandible.'+form).hide(300);
        $('.more-modal.'+form+" i").removeClass("zmdi-minus");
        $('.more-modal.'+form+ " i").addClass("zmdi-plus");
    }

}

async function sendModal()
{
    const collectionAddress=getNewCollectionAddress("modal_");
    const deliveryAddress=getNewDeliveryAddress("modal_");
    const packageSave=getPackageToSave("modal_");
    const recipientsName=$("#modal_p_name").val();
    const recipientsSurname=$("#modal_p_surname").val();
    if(collectionAddress&&deliveryAddress&&packageSave)
    {
        $(".loading").show();
        deliveryAddress.addCoordinates(coords);
        const sm=new ServiceManager();
        await sm.parseToSave(deliveryAddress,collectionAddress,
            recipientsName,recipientsSurname);
        $(".loading").hide();
        exitModal();
    }
    else
    {
        new ErrorDialog("Debes completar algunos campos para continuar").show();
    }
}



function getNewDeliveryAddress(location)
{
    const combo=document.getElementById(location+"d_country");
    const dCountry=combo.options[combo.selectedIndex].text;
    const dCity=$("#"+location+"d_city");
    const dLine1=$("#"+location+"d_line1");
    const dLine2=$("#"+location+"d_line2");
    const dZip=$("#"+location+"d_zipCode");
    const dDescription=$("#"+location+"d_description");
    const valid=eval(dCity)||eval(dLine1)||eval(dZip);
    if(eval(dCity)&&eval(dLine1)&&eval(dZip))
    {
        return new DeliveryAddress(dCountry,dCity.val(),
            dLine1.val(),dLine2.val(),dZip.val(),dDescription.val());
    }
    return null;
}

function getNewCollectionAddress(location)
{
    const combo = document.getElementById(location + "c_country");
    const cCountry = combo.options[combo.selectedIndex].text;
    const cCity = $("#" + location + "c_city");
    const cLine1 = $("#" + location + "c_line1");
    const cLine2 = $("#" + location + "c_line2");
    const cZip = $("#" + location + "c_zipCode");
    const valid = eval(cCity) || eval(cLine1) || eval(cZip);
    if (eval(cCity) && eval(cLine1) && eval(cZip)) {
        return new CollectionAddress(cCountry, cCity.val(), cLine1.val(),
            cLine2.val(), cZip.val());
    }
    return null;
}

function getPackageToSave(location)
{
    const pDescription = $("#" + location + "p_description");
    const pWeight = $("#" + location + "p_weight");
    const pName = $("#" + location + "p_name");
    const pSurname = $("#" + location + "p_surname");
    const valid = eval(pDescription) || eval(pWeight) || eval(pName)||eval(pSurname);
    if (eval(pDescription) && eval(pWeight) && eval(pName)&& eval(pSurname))
    {
        pWeight.val(Math.abs(pWeight.val()));
        packagesToSave.push(new Package(parseFloat(pWeight.val()),pDescription.val(),1));
        return true;
    }
    return false;
}

function eval(element)
{
    if(element.val().trim()==="")
    {
        element.css("border","solid 2px red");
        element.focus();
        return false;
    }
    element.css("border","solid 1px orange");
    return true;
}

function savePackageAndNew()
{
    if(getPackageToSave("modal_"))
    {
        $(".packageNew").hide(300);
        $(".packageNew").show(300);
        $("#modal_p_description").val("");
        $("#modal_p_weight").val("");

        $(".more-modal.red").css("display","inline-block");
    }
    else
    {
        new ErrorDialog("Debes completar algunos campos para continuar").show();
    }
}
function deleteNewPackage()
{
    const aPackage=packagesToSave[packagesToSave.length-1];

    $(".packageNew").hide(300);
    $(".packageNew").show(300);
    $("#modal_p_description").val(aPackage.description);
    $("#modal_p_weight").val(aPackage.weight);
    eval($("#modal_p_description"))&&eval($("#modal_p_weight"));
    packagesToSave.pop();
    if(packagesToSave.length==0)
        $(".more-modal.red").hide();

}