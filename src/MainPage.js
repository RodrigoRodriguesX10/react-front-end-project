import React, { Component } from "react";
import { Route } from "react-router-dom";
import ProdutoList from "./Components/Produto/ProdutoList";
import ModelForm from "./Components/Produto/ModelForm";

export default class MainPage extends Component {

    render() {
        return (
            <div className="container body-container">
                <Route exact path="/" component={Index} />
                <Route path="/produtos" component={ProdutoList} />
                <Route exact path="/produto/criar" component={ModelForm} />
                <Route exact path="/produto/editar/:id" render={({ match }) => <ModelForm id={match.params.id} />} />
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