async function addAddress()
{
	var line1=document.getElementById('line1').value;
	var line2=document.getElementById('line1').value;
	var city=document.getElementById('city').value;
	var countryBox=document.getElementById('country');
	var country=countryBox.options[countryBox.selectedIndex].text;
	var zipCode=document.getElementById('zipCode').value;
	
	var dao=new CollectionAddressDAO();

	var key=await dao.create(new CollectionAddress(country,city,line1,line2,zipCode));
	if(key.collection_address_id===undefined)
	{
	    console.log("error al conectar");
	}
	else
	{
	    window.location="../"
	}
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
            addAddress();
        }

		form.addClass('was-validated');
	});
