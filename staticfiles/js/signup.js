function signup ()
{
	var email=document.getElementById('email').value;
	var password=document.getElementById('password').value;
	var birthDate=document.getElementById('birthDate').value;
	var firstName=document.getElementById('firstName').value;
	var secondName=document.getElementById('secondName').value;
	var firstSurname=document.getElementById('firstSurname').value;
	var secondSurname=document.getElementById('secondSurname').value;
	var dao=new UserDAO();
	dao.create(new User(email,password,birthDate,firstName, secondName, firstSurname,secondSurname));
}