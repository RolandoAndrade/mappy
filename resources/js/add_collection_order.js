function savePackageAndNewCreator()
{
    if (getPackageToSave("create_"))
    {
        $(".packageNew").hide(300);
        $(".packageNew").show(300);
        $("#create_p_description").val("");
        $("#create_p_weight").val("");
        packageCardGenerator();
    }
    else
     {
        new ErrorDialog("Debes completar algunos campos para continuar").show();
    }
}
class PackageCard
{
    constructor(description, weight, index)
    {
        $(".scroll-create").append(
            "<div class=\"cards-create\">\n" +
            "\t\t\t\t\t<div class=\"package-create-container\">\n" +
            "\t\t\t\t\t\t<div class=\"title-section\">\n" +
            "\t\t\t\t\t\t\tDatos del paquete<br>\n" +
            "\t\t\t\t\t\t<i class=\"zmdi zmdi-dropbox\"></i>\n" +
            "\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t<div class=\"content-create\">\n" +
            "\t\t\t\t\t\t\t<div class=\"packageNew\">\n" +
            "\t\t\t\t\t\t\t\t<div class=\"label-create\">Descripción</div>\n" +
            "\t\t\t\t\t\t\t\t<div class=\"label-create b\"><b>"+description+"</b></div>\n" +
            "\t\t\t\t\t\t\t\t<div class=\"label-create\">Peso en kg</div>\n" +
            "\t\t\t\t\t\t\t\t<div class=\"label-create b\"><b>"+weight+"</b></div>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t<div class=\"more-modal red\" onclick=\"deletePackageOn("+index+")\" style=\"display: block\">\n" +
            "\t\t\t\t\t\t\t\t<i class=\"zmdi zmdi-delete\"></i></div>\n" +
            "\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t</div>\n" +
            "\t\t\t\t</div>"
        )
    }
}

function deletePackageOn(index)
{
    packagesToSave.splice(index,1);
    packageCardGenerator();
}
function packageCardGenerator()
{
    $(".scroll-create").empty();
    for(let i=0;i<packagesToSave.length;i++)
    {
        new PackageCard(packagesToSave[i].description,packagesToSave[i].weight,i);
    }
}
function getCoords(form)
{
    return form==="modal"?coords:miniCoords;
}
async function sendOrderForm(form)
{
    const collectionAddress=getNewCollectionAddress(form+"_");
    const deliveryAddress=getNewDeliveryAddress(form+"_");
    const packageSave=getPackageToSave(form+"_");
    const recipientsName=$("#"+form+"_p_name").val();
    const recipientsSurname=$("#"+form+"_p_surname").val();
    if(collectionAddress&&deliveryAddress&&packageSave) {
        let c = getCoords(form);
        if (c == null)
        {
            const line1=$("#create_d_line1").val();
	        const line2=$("#create_d_line2").val();
            await findLocation(line1,line2);
            packagesToSave.pop();
            return;
        }
        $(".loading").show();
        deliveryAddress.addCoordinates(c);
        const sm = new ServiceManager();
        await sm.parseToSave(deliveryAddress, collectionAddress,
            recipientsName, recipientsSurname);
        $(".loading").hide();
        if (form === "modal")
            exitModal();
        else
        {
            viewsManager.changeToMap();
            $("#formi").replaceWith(copyMakeACollectionOrder);
            copyMakeACollectionOrder=$("#formi").clone();
            $(".scroll-create").empty();
            $(".create-container.OfPackage").replaceWith(copyPackageForm);
	        copyPackageForm=$(".create-container.OfPackage").clone();
            miniCoords=null;
            miniMap.clearMarkers();
        }
        packagesToSave=[];
        await getAllDeliveryAddresses();
        await getAllCollectionAddresses();
    }
    else
    {
        if(packageSave)
            packagesToSave.pop();
        new ErrorDialog("Debes completar algunos campos para continuar").show();
    }
}
async function findLocation(line1, line2)
{
	await $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+
        line1+", "+line2, function(data){
            if(data.length>0)
            {
                const dir=data[0];
                miniCoords=new Coordinates(dir.lat,dir.lon);
                miniMap.clearMarkers();
                miniMap.addMarker(miniCoords);
                miniMap.setView(miniCoords);
                new WarningDialog("Confirme las coordenadas", "Revise la ubicación marcada en el mapa").show();
            }
            else
            {
                new ErrorDialog("No fue encontrada la dirección. Ubique la dirección manualmente en el mapa").show();
            }
        });
}
