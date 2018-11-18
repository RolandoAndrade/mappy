
function done()
{
    console.log("done");
}
function fail()
{
    console.log("fail");
}
async function login ()
{
	var email=document.getElementById('email');
	var password=document.getElementById('password');
	var dao=new UserDAO();
	var key=await dao.login(new Guess(email.value,password.value));
	var error=document.getElementById("invalid-feedback");
	if(key.key===undefined)
	{
	    if(key.non_field_errors!=undefined)
	    {   error.innerHTML = key.non_field_errors;
	        error.style.display="inline";
	        email.style.borderColor="#dc3545";
	        password.style.borderColor="#dc3545";
	    }
	}
	else
        window.location="../";


}

	$(".my-login-validation").submit(function()
	 {
		var form = $(this);
		event.preventDefault();
        event.stopPropagation();
        if (form[0].checkValidity() === false)
        {

        }
        else
        {
            login();
        }

		form.addClass('was-validated');
	});
