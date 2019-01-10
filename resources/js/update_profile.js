function isValidToUpdate(field)
{
    if(field.val().trim().length===0)
    {
        field.css("border-color","red");
        new ErrorDialog("Tienes algunos campos vacíos").show();
        return false;
    }
    field.css("border-color","orange");
    return true;
}
function areAllFieldsValid()
{
    return isValidToUpdate($("#user_first_name"))&&
        isValidToUpdate($("#user_second_name"))&&
        isValidToUpdate($("#user_first_surname"))&&
        isValidToUpdate($("#user_second_surname"));
}

async function updateProfileData()
{
    if (!areAllFieldsValid())
    {
        return;
    }
    const firstName=$("#user_first_name").val();
    const secondName=$("#user_second_name").val();
    const firstSurname=$("#user_first_surname").val();
    const secondSurname=$("#user_second_surname").val();
    const dao = new UserDAO();
    $(".loading").show();
    const data = await dao.update(firstName,secondName,firstSurname,secondSurname);
    updateProfileStats(data);
    $(".loading").hide();
}

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'rolandoandrade',
  uploadPreset: 'rolando_andrade'}, (error, result) =>{
    if(result.event==="success")
    {
        const dao=new UserDAO();
        dao.updateProfileImage(result.info.url);
        $('.user-image').attr("src",result.info.url);
        orderManager.reset();
    }

});

$("#profile-image-card").on("click", function () {
   myWidget.open();
});
$(".user-image.update").on("click", function () {
   myWidget.open();
});

