var attempts = [];

async function login ()
{
	var email=document.getElementById('email');
	var password=document.getElementById('password');
	var dao=new UserDAO();
	var error=document.getElementById("invalid-feedback");
	error.style.display="none";
	email.style.borderColor="#28a745";
	password.style.borderColor="#28a745";
	var key=await dao.login(new Guess(email.value,password.value));
	if(key.key===undefined)
	{
	    if(key.non_field_errors!=undefined)
	    {   error.innerHTML = key.non_field_errors;
	        error.style.display="inline";
	        email.style.borderColor="#dc3545";
	        password.style.borderColor="#dc3545";
	        attempts.push(email.value);
	    }
	}
	else
	{
	    var count=0;
	    for(var i=0;i<attempts.length;i++)
	        if(attempts[i]==email.value)
	            count++;
	    console.log(count);
	    if(count<5)
	        window.location="../"
	    else
	        window.location="../api/disable"
	}
	console.log(attempts);



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
