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