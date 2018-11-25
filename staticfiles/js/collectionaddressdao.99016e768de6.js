class Cookie
{
	constructor(name)
	{
		this.name=name;
	}
	getCookie()
	{
		var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {

                var cookie = cookies[i];
                cookie=cookie.trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, this.name.length + 1) == (this.name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(this.name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
	}
}

class CollectionAddress
{
	constructor(country, city, line1, line2, zipCode)
	{
		this.country=country;
		this.city=city;
		this.line1=line1;
		this.line2=line2;
		this.zipCode=zipCode;
	}
}


class CollectionAddressDAO 
{

	async makeARequest(request,url)
    {
        var dat=JSON.stringify(request);
        console.log(request);
        var cookie=new Cookie("csrftoken");
        var token=cookie.getCookie();
        console.log(token);
        var getDevices = async () => {
                const location = window.location.hostname;
                const settings = {
                	method: 'POST',
                	body: dat,
                	headers: {
                	    Accept: 'application/json',
                	    'Content-Type': 'application/json',
                	    "X-CSRFToken": token,
                	}
            	};
            	console.log(settings);
                const data = await fetch(url, settings)
                    .then(response => response.json())
                    .then(json => {
                    console.log(json);
                     return json;
                    })
                    .catch(e => {
                    console.log(e);
                        return e
                    });
                return data;
        }
        return await getDevices();
    }
    async create(collectionAddress)
    {
        var data ={
        	user_id: null,
            line1: collectionAddress.line1,
            line2: collectionAddress.line2,
            zipCode: collectionAddress.zipCode,
            city: collectionAddress.city,
            country: collectionAddress.country,
            
        };
        return await this.makeARequest(data,'../api/collection_address/create/');
    }
    delete(collectionAddress)
    {
    }
    findById(id)
    {
    }
    constructor() 
    {

    }
}