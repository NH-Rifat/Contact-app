class Http{
    async get(url){
        const response = await fetch(url).then((res)=>res.json());

        return response;
    }

    async post(url,data){
        const response = await fetch(url,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                "Content-type":'application/json',
            },
        }).then((res)=>res.json())

        return response;
    }

    async update(url,data){
        const response = await fetch(url,{
            method:'PUT',
            body:JSON.stringify(data),
            headers:{
                "Content-type":'application/json',
            },
        }).then((res)=>res.json())

        return response;
    }

    async delete(url){
        const response = await fetch(url,{
            method:'DELETE',

        }).then((res)=>res.json())

        return response;
    }
}

export const http = new Http();