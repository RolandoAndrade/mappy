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
    async makeARequest(request,url)
    {
        var dat=JSON.stringify(request);
        console.log(request)
        var getDevices = async () => {
                const location = window.location.hostname;
                const settings = {
                    method: 'POST',
                    body: dat,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                };
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

    async login(user)
    {
        var data ={
            email: user.email,
            password: user.password,
        };
        return await this.makeARequest(data,'../api/login/');
    }

    logout()
    {
        window.location="api/v/logout"
    }
    async create(user)
    {
        var data ={
            email: user.email,
            password1: user.password,
            birthDate: user.birthDate,
            firstName: user.firstName,
            secondName: user.secondName,
            firstSurname: user.firstSurname,
            secondSurname: user.secondSurname
        };
        return await this.makeARequest(data,'../api/registration/');
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