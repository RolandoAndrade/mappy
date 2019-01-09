let attempts = [];

function getRepsOf(email)
{
	let count=0;
	for(let i=0;i<attempts.length;i++)
		if(attempts[i]===email)
			count++;
	return count;
}


async function login ()
{
	let email=$('#email');
	let password=$('#password');
	const manager=new AuthManager();
	let error=$("#invalid-feedback");

	error.hide();
	email.css("border-color","#28a745");
	password.css("border-color","#28a745");

	let key=await manager.login(email.val(),password.val());

	if(key instanceof MyError)
	{
		let reps=getRepsOf(email.val());
	    error.text(reps<5?key.getMessage():'La cuenta ha sido desactivada.');
	    error.show();
	    email.css("border-color","#dc3545");
	    password.css("border-color","#dc3545");
	    attempts.push(email.val());
	    if(reps===5)
		{
			await manager.disable(email.val());
		}
	}
	else
	{
		window.location="../"
	}
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
		login();
	}
	form.addClass('was-validated');
});
