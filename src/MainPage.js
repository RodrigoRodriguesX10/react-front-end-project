import React, { Component } from "react";
import { Route } from "react-router-dom";
import ProdutoList from "./Components/Produto/ProdutoList";
import PedidoList from "./Components/Pedido/PedidoList";
import ClienteList from "./Components/Cliente/ClienteList";
import ProdutoForm from "./Components/Produto/ProdutoForm";
import PedidoForm from "./Components/Pedido/PedidoForm";
import ClienteForm from "./Components/Cliente/ClienteForm";

export default class MainPage extends Component {
    render() {
        return (
            <div className="container body-container">
                <Route exact path="/" component={Index} />
                <Route exact path="/pedido" component={PedidoList} />
                <Route exact path="/produto" component={ProdutoList} />
                <Route exact path="/cliente" component={ClienteList} />

                <Route exact path="/produto/criar" component={ProdutoForm} />
                <Route exact path="/pedido/criar" component={PedidoForm} />
                <Route exact path="/cliente/criar" component={ClienteForm} />

                <Route exact path="/cliente/editar/:id" render={({ match }) => <ClienteForm id={match.params.id} />} />
                <Route exact path="/produto/editar/:id" render={({ match }) => <ProdutoForm id={match.params.id} />} />
            </div>
        )
    }
}

class Index extends Component {
    render() {
        return (<div>
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Bem vindo(a) - React Application</h2>
                    <p><br />
                        Essa aplicação foi feita com React para WEB e utiliza o conceito de componentes
                        e padrão MVVM para tratar dados e estados de componentes, bem como suas propriedades e seu comportamento.
                    </p>
                </div>
            </div>
        </div>);
    }
}