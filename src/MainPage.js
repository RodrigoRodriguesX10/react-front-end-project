import React, { Component } from "react";
import { Route } from "react-router-dom";

export class Pedido extends Component {
    render() {
        return <div><p> PEDIDOS </p></div>
    }
}

export class Produto extends Component {
    render() {
        return <div><p> PRODUTOS </p></div>
    }
}

export default class MainPage extends Component {
    
    render() {
        return (
        <div className="container">
            <Route path="/" />
            <Route path="/produto" component={Produto} />
            <Route path="/pedido" component={Pedido} />
        </div>
        )
    }
}