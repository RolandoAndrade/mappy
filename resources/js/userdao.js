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
    constructor(email, password, birthDate, firstName, secondName,firstSurname, secondSurname)
    {
        this.email=email;
        this.password=password;
        this.birthDate=birthDate;
        this.firstName=firstName;
        this.secondName=secondName;
        this.firstSurname=firstSurname;
        this.secondSurname=secondSurname;
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
        const request = new PostRequest(data,'../api/login/')
        return await request.execute();
    }

    logout()
    {
        window.location="api/v/logout"
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
        const request=new GetRequest('api/users/get/me');
        const response = await request.execute();
        if(response.image!=null)
            response.image=response.image.substr(response.image.lastIndexOf("/"),response.image.length);
        return response;
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
    delete(user)
    {
    }
    findById(id)
    {
    }
     constructor(email, password)
    {
    }
}