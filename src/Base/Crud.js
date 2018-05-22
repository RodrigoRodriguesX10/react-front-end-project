var baseUri = "";
var apiUrl = "";

export default class Crud {
    static _urlApi;
    static set(urlApi){
        Crud._urlApi = urlApi;
    }

    static get(id) {
        return fetch(baseUri + (id ? "/" + id : ""), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(function(res){
            return res.json();
        });
    }
    static post(model) {
        return fetch(baseUri, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model),
        }).then(function(res){
            return res.json();
        });;
    }
    static put(model) {
        return fetch(baseUri, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model),
        }).then(function(res){
            return res.json();
        });
    }
    static delete(id) {
        return fetch(baseUri+ (id ? "/" + id : ""), {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(function(res){
            return res.json();
        });
    }
}