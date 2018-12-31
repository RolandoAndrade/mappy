async function updateProfileData()
{
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