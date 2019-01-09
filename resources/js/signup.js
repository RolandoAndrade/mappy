async function signup ()
{
	let email=$('#email');
	let password=$('#password');
	let birthDate=$('#birthDate');
	let firstName=$('#firstName').val();
	let secondName=$('#secondName').val();
	let firstSurname=$('#firstSurname').val();
	let secondSurname=$('#secondSurname').val();
	let error1=$('#invalid-feedback1');
	if(!validateFields(email,password, birthDate))
	{
		return;
	}
	const manager=new AuthManager();

	let key=await manager.create(email.val(),password.val(),birthDate.val(),
		firstName, secondName, firstSurname,secondSurname);
	if(key instanceof MyError)
	{
	    error1.text(key.email);
	    error1.show();
	    email.css("border-color","#dc3545");
	}
	else
        window.location="../";
}

function validate(field, validation, text)
{
	if(!validation)
	{
		field.css("border-color", "#dc3545");
		$('#invalid-'+text).show();
		return false;
	}
	field.css("border-color","#28a745");
	$('#invalid-'+text).hide();
	return true;
}

function validateFields(email, password, birthdate)
{
	let v=new Validator();
	return validate(email, v.validateEmail(email.val()), "email")&&
		validate(password, v.validatePassword(password.val()), "password")&&
		validate(birthdate, v.validateBirthdate(birthdate.val()), "birthday");
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