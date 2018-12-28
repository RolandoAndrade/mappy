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
