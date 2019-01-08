async function signup ()
{
	let email=$('#email');
	let password=$('#password');
	let birthDate=$('#birthDate');
	let firstName=$('#firstName').value;
	let secondName=$('#secondName').value;
	let firstSurname=$('#firstSurname').value;
	let secondSurname=$('#secondSurname').value;
	let error1=$('#invalid-feedback1');
	let v=new Validator();
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

function validate(field, validation)
{
	if(validation)
	{

	}
	else
	{

	}
}

function validateFields(email, password, birthdate)
{

}

$(".my-login-validation").submit(function()
{
	let form = $(this);
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