async function signup ()
{
	var email=document.getElementById('email');
	var password=document.getElementById('password');
	var birthDate=document.getElementById('birthDate');
	var firstName=document.getElementById('firstName').value;
	var secondName=document.getElementById('secondName').value;
	var firstSurname=document.getElementById('firstSurname').value;
	var secondSurname=document.getElementById('secondSurname').value;
	var error1=document.getElementById('invalid-feedback1');
	var v=new Validator();
	if(!v.validateBirthdate(birthDate.value))
	{
	    birthDate.style.borderColor="#dc3545";
	    document.getElementById('invalid-birthdate').style.display="inline";
	    return;
	}
	else
	{
	    birthDate.style.borderColor="#28a745";
	    document.getElementById('invalid-birthdate').style.display="none";
	}
	if(!v.validateEmail(email.value))
	{
	    email.style.borderColor="#dc3545";
	    document.getElementById('invalid-email').style.display="inline";
	    return;
	}
	else
	{
	    email.style.borderColor="#28a745";
	    document.getElementById('invalid-email').style.display="none";
	}
	if(!v.validatePassword(password.value))
	{
	    password.style.borderColor="#dc3545";
	    document.getElementById('invalid-password').style.display="inline";
	    return;
	}
	else
	{
	    password.style.borderColor="#28a745";
	    document.getElementById('invalid-password').style.display="none";
	}
	var dao=new UserDAO();
	var key=await dao.create(new User(email.value,password.value,birthDate.value,firstName, secondName, firstSurname,secondSurname));
	if(key.key===undefined)
	{
	    if(key.email!=undefined)
	    {   error1.innerHTML = key.email;
	        error1.style.display="inline";
	        email.style.borderColor="#dc3545";
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
            signup();
        }

		form.addClass('was-validated');
	});