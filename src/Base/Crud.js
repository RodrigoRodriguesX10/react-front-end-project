
export default class Crud {
    constructor(name){
        this._apiUrl = "http://localhost:8000/api";
        this._baseUri = this._apiUrl + "/" + name;
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.put = this.put.bind(this);
        this.post = this.post.bind(this);
    }

    get(id) {
        return fetch(this._baseUri + (id ? "/" + id : ""), {
            method: 'GET',
            mode: "cors",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Origin": "localhost"
            },
        }).then(function(res){
            return res.json();
        });
    }
    post(model) {
        return fetch(this._baseUri, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Origin": "localhost"
            },
            body: JSON.stringify(model),
        }).then(function(res){
            return res.json();
        });
    }
    put(model) {
        return fetch(this._baseUri, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Origin": "localhost"
            },
            body: JSON.stringify(model),
        }).then(function(res){
            return res.json();
        });
    }
    delete(id) {
        return fetch(this._baseUri + (id ? "/" + id : ""), {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Origin": "localhost"
            },
        }).then(function(res){
            return res.json();
        });
    }
}