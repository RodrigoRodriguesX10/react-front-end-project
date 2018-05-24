import React, { Component } from "react";
import Pedido from "../../Models/Pedido";
import Produto from "../../Models/Produto";
import Cliente from "../../Models/Cliente";
import * as Widget from "../../Base/Widgets";
export default class PedidoForm extends Component {
    constructor() {
        super();
        this.state = {
            model: new Pedido(),
            produtoList: []
        };
        this.changeModel = this.changeModel.bind(this);
        this.calculaTotal = this.calculaTotal.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        this.state.model.produto.get().then(function (produtos) {
            this.setState({ produtoList: produtos });
        }.bind(this));
        
        this.state.model.cliente.get().then(function (clientes) {
            this.setState({ clienteList: clientes });
        }.bind(this));

        if (this.props.id) {
            this.state.model.get(this.props.id).then(function (pedido) {
                pedido.__proto__ = Pedido.prototype;
                pedido.produto.__proto__ = Produto.prototype;
                pedido.cliente.__proto__ = Cliente.prototype;
                this.setState({ model: pedido });
            }.bind(this));    
        }
        this.setState({ texto: this.props.id ? "Editar" : "Criar" });
    }

    changeModel(e, v) {
        var x = this.state.model;

        if((e instanceof String) || (typeof e === "string") ){
            x[e] = v;
        } else{
            x[e.target.name] = e.target.value;
            if (e.target.type === "number") {
                x[e.target.name] = Number(e.target.value);
            }
        }
        this.setState({ model: x });
    }

    calculaTotal(e){
        var x = this.state.model;
        x.total = +(e.target.value || 0) * (x.produto ? x.produto.preco : 0);
        this.setState({ model: x });
    }

    submitForm(event) {
        event.preventDefault();
        if (this.state.model._id) {
            alert("Você não pode alterar esse registro");
        } else {
            this.state.model.post(this.state.model).then(function (res) {
                window.location.pathname = "pedido";
            });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <h3>{ this.state.texto} Pedido</h3>
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label className="control-label">Produto: </label>
                            <Widget.Select
                                id="produto"
                                items={this.state.produtoList}
                                name="produto"
                                selected={this.state.model.produto}
                                callback={this.changeModel}
                                textfield="nome"></Widget.Select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Cliente: </label>
                            <Widget.Select id="cliente"
                                items={this.state.clienteList}
                                selected={this.state.model.cliente}
                                name="cliente"
                                callback={this.changeModel}
                                textfield="nome"></Widget.Select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Quantidade: </label>
                            <input readOnly={!!this.state.produto} min="1" value={this.state.model.quantidade} type="number" onChange={(e) => {this.changeModel(e); this.calculaTotal(e);}} className="form-control" name="quantidade" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Total: </label>
                            <input readOnly type="number" step="0.01" className="form-control" value={this.state.model.total} name="total" />
                        </div>
                        <div hidden={!!this.state.model._id} className="form-group">
                            <input type="submit" onClick={() => console.log(this.state.model)} value="Cadastrar" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}