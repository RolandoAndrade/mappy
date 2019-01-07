class Guess
{
    constructor(email, password)
    {
        this.email=email;
        this.password=password;
    }
}

class User
{
    constructor(email, password, birthDate, firstName, secondName,firstSurname, secondSurname, image)
    {
        this.email=email;
        this.password=password;
        this.birthDate=birthDate;
        this.firstName=firstName;
        this.secondName=secondName;
        this.firstSurname=firstSurname;
        this.secondSurname=secondSurname;
        this.image = image | "";
    }
}

class UserDAO
{
    async login(user)
    {
        const data ={
            email: user.email,
            password: user.password,
        };

        const request = new PostRequest(data,'../api/login/');

        const r=await request.execute();
        console.log(r);
        return r;
    }

    async logout()
    {
        const data ={};
        const request = new PostRequest(data,'../api/logout/');
        return await request.execute();
    }

    async create(user)
    {
        const data ={
            email: user.email,
            password1: user.password,
            birthDate: user.birthDate,
            firstName: user.firstName,
            secondName: user.secondName,
            firstSurname: user.firstSurname,
            secondSurname: user.secondSurname
        };
        const request = new PostRequest(data,'../api/registration/');
        return await request.execute();
    }

    async getUser()
    {
        const request=new GetRequest('../api/users/get/me');
        return await request.execute();
    }

    async update(firstName, secondName, firstSurname, secondSurname)
    {
        const data ={
            firstName: firstName,
            secondName: secondName,
            firstSurname: firstSurname,
            secondSurname: secondSurname
        };
        const request = new PutRequest(data,'../api/users/put/me');
        return await request.execute();
    }

    async updateProfileImage(url)
    {
        const data ={
            image: url
        };
        const request = new PutRequest(data,'../api/users/updateImage/me');
        return await request.execute();
    }

    delete(user)
    {
    }

    async findByEmail(email)
    {
        const request=new GetRequest('../api/users/giveMe?user='+email);
        return await request.execute();
    }

    async disableUser(id)
    {
         const data ={
            enabled: false
        };
        const request = new PutRequest(data,'../api/users/enabled/'+id);
        return await request.execute();
    }
}

class Coordinates
{
    constructor(latitude, longitude)
    {
        try
        {
            const lat=latitude.toString().substr(0,8);
            const lon=longitude.toString().substr(0,8);
            this.latitude=parseFloat(lat);
            this.longitude=longitude(parseFloat(lon));
        }
        catch (e)
        {
            this.latitude=0;
            this.longitude=0;
        }
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

	equals(collectionAddress)
    {
        return this.country===collectionAddress.country &&
        this.city===collectionAddress.city&&this.line1===collectionAddress.line1&&
        this.line2===collectionAddress.line2&&this.zipCode===collectionAddress.zipCode;
    }
}

class CollectionAddressDAO
{
    async create(collectionAddress)
    {
        const data = {
            line1: collectionAddress.line1,
            line2: collectionAddress.line2,
            zipCode: collectionAddress.zipCode,
            city: collectionAddress.city,
            country: collectionAddress.country,
        };
        const request=new PostRequest(data,'api/collection_address/create/');
        return await request.execute();
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
    async getAll()
    {
        const request=new GetRequest('api/collection_address/getAll');
        return await request.execute();
    }
}

var coords=new Coordinates(0,0);
var miniCoords=null;

class DeliveryAddress extends CollectionAddress
{
	constructor(country, city, line1, line2, zipCode, description)
	{
        super(country, city, line1, line2, zipCode);
		this.description=description;
		this.coordinates=null;
	}

	addCoordinates(coordinates)
    {
        this.coordinates=coordinates;
    }
}

class DeliveryAddressDAO
{
    async create(deliveryAddress)
    {
        const data = {
            line1: deliveryAddress.line1,
            line2: deliveryAddress.line2,
            zipCode: deliveryAddress.zipCode,
            city: deliveryAddress.city,
            country: deliveryAddress.country,
            description: deliveryAddress.description,
            latitude: deliveryAddress.coordinates.latitude,
            longitude: deliveryAddress.coordinates.longitude,
        };
        const request=new PostRequest(data,'api/delivery_address/create');
        return await request.execute();
    }
    delete(collectionAddress)
    {
    }
    findById(id)
    {
    }

    async getAll()
    {
        const request=new GetRequest('api/delivery_address/getAll');
        return await request.execute();
    }
    constructor()
    {

    }
}

class CollectionOrder
{
	constructor(id, collectionAddress, deliveryAddress, recipientsName, recipientsSurname)
	{
	    this.id=id;
	    this.packages=[];
		this.collectionAddress=collectionAddress;
		this.deliveryAddress=deliveryAddress;
		this.recipientsName=recipientsName;
		this.recipientsSurname=recipientsSurname;
	}

	addPackages(packages)
    {
        this.packages.push(packages);
    }

    getPackagesResume()
    {
        let ret="";
        for(let i=0;i<this.packages.length;i++)
        {
            ret+=this.packages[i].description+", ";
        }
        return ret.substr(0,ret.length-2);
    }

    getWeight()
    {
        let ret=0;
        for(let i=0;i<this.packages.length;i++)
        {
            ret+=parseFloat(this.packages[i].weight);
        }
        return ret;
    }

    async delete()
    {
        let dao=new CollectionOrderDAO();
        return await dao.delete(this);
    }
}

class CollectionOrderDAO
{
    async create(collectionOrder)
    {
        const data = {
            user_id: null,
            collection_address_id: collectionOrder.collectionAddress,
            delivery_address_id: collectionOrder.deliveryAddress,
            recipientsName: collectionOrder.recipientsName,
            recipientsSurname: collectionOrder.recipientsSurname,
        };
        const request=new PostRequest(data,'api/collection_order/create');
        return await request.execute();
    }
    async getAll()
    {
        const request=new GetRequest('api/collection_order/getAll');
        return await request.execute();
    }

    async delete(collectionOrder)
    {
        const request=new DeleteRequest('api/collection_order/remove',collectionOrder.id)
        return await request.execute();
    }
    findById(id)
    {
    }
    constructor()
    {

    }
}

class Package
{
	constructor(weight, description, order)
	{
		this.weight=weight;
		this.description=description;
		this.order=order;
	}
}

class PackageDAO
{
    async create(APackage)
    {
        const data = {
            weight: APackage.weight,
            description: APackage.description,
            order: APackage.order,
        };
        const request=new PostRequest(data,'api/package/create/');
        return await request.execute();
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

var packagesToSave=[];

async function deleteOrder(collectionOrder)
{
    const swal=new SwalModal(
        '¿Estás seguro?',
	    'La orden de recolección será eliminada',
	    'warning',
	    true,
        '#F44336',
	    '#DC8502',

	    'Sí, ¡quiero eliminarla!',
	    'No, cancelar!',
        async function () {
	    		await continueDeleteOrder(collectionOrder);
	    }
    );
    swal.show();

}
async function continueDeleteOrder(collectionOrder)
{
    const dao=new CollectionOrderDAO();
    const response= await dao.delete(collectionOrder);
    if(response=="Deleted")
    {
        orderManager.delete(collectionOrder);
    }

}

class MyError
{
    constructor(error)
    {
        this.error=error;
    }
}

class MyCorrect
{
    constructor(message)
    {
        this.message=message;
    }
}

class JSONparser
{
    parseUser(json)
    {
        if(json&&json.user_id)
        {
            return new User(json.user_id,json.password,json.birthDate,json.firstName,
                json.secondName, json.firstSurname, json.secondSurname);
        }
        return new User("","","","","","","");
    }

    parseCollectionAddress(json)
    {
        if(json&&json.collection_address_id)
        {
            return new CollectionAddress(json.country, json.city, json.line1, json.line2,json.zipCode);
        }
        return new CollectionAddress("","","","","");
    }

    parseDeliveryAddress(json)
    {
        if(json&&json.delivery_address_id)
        {
            let del = new DeliveryAddress(json.country, json.city, json.line1, json.line2,json.zipCode);
            del.addCoordinates(new Coordinates(json.latitude, json.longitude));
            return del;
        }
        return new DeliveryAddress("","","","","","");
    }

    parsePackage(json)
    {
        if(json&&json.package_id)
        {
            return new Package(json.weight,json.description, json.order);
        }
    }
    parseCollectionOrder(json)
    {
        if(json&&json.collection_order_id)
        {
            let co = new CollectionOrder(json.collection_order_id,
                this.parseCollectionAddress(json.collection_address_id),
                this.parseDeliveryAddress(json.delivery_address_id),
                json.recipientsName, json.recipientsSurname);
            for(let i=0;i<json.order.length;i++)
            {
                co.addPackages(this.parsePackage(json.order[i]));
            }
            return co;
        }
        return new CollectionOrder(0, this.parseCollectionAddress(undefined),
            this.parseDeliveryAddress(undefined),"","");
    }

    parseKey(json)
    {
        if(json&&json.key)
        {
            return new MyCorrect(json.key);
        }
        return new MyError(json);
    }
}


class AuthManager
{
    constructor()
    {
        this.dao=new UserDAO();
        this.parser=new JSONparser();
    }

    async login(email, password)
    {
        const key = await this.dao.login(new Guess(email,password));
        return this.parser.parseKey(key);
    }

    async create(email, password, birthDate, firstName, secondName,firstSurname, secondSurname)
    {
        const key = await this.dao.create(new User(email,password,birthDate,
            firstName, secondName, firstSurname, secondSurname));
        return this.parser.parseKey(key);
    }

    async me()
    {
        const user = await this.dao.getUser();
        return new User(user.email, "", "", user.firstName, user.secondName,
            user.firstSurname, user.secondSurname, user.image);
    }

    async logout()
    {
        const r = await this.dao.logout();
        window.location="../";
    }

    async disable(email)
    {
        const user = await this.dao.findByEmail(email);
        if(user.length===0)
            return new MyError("No hay usuario registrado a este nombre");
        return await this.dao.disableUser(user.user_id);
    }

    async updateData(firstName, secondName, firstSurname, secondSurname)
    {
        return await this.dao.update(firstName,secondName,firstSurname,secondSurname);
    }

    async updateProfileImage(image)
    {
        return await this.dao.updateProfileImage(image);
    }
}