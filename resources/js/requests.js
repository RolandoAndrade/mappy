class GetRequest
{
    constructor(url)
    {
        this.url=url;
    }

    async execute()
    {
        return await fetch(this.url).then(response =>
            response.json()).then(json => {
                return json;}).catch(e => {return e});
    }
}

class PostRequest
{
    constructor(data, url)
    {
        this.data=JSON.stringify(data);
        this.url=url;
    }

    async execute()
    {
        const location = window.location.hostname;
        const settings = {
            method: 'POST',
            body: this.data,
            headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
        return await fetch(this.url, settings)
                    .then(response => response.json())
                    .then(json => {
                     return json;
                    })
                    .catch(e => {
                        return e
                    });
    }
}