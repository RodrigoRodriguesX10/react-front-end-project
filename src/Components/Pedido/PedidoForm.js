import React, { Component } from "react";
import Pedido from "../../Models/Pedido";
import Select from "../../Base/Select";
export default class PedidoForm extends Component {
    constructor() {
        super();
        this.state = {
            model: new Pedido(),
            produtoList: [{
                id: 1,
                categoria: "Comida",
                preco: 1.75,
                nome: "Pão com ovo"
            }, {
                id: 2,
                categoria: "Alimentos naturais",
                preco: 3,
                nome: "Mandioca"
            }, {
                id: 3,
                categoria: "Laticínios",
                preco: 1.7,
                nome: "Caixa de Leite"
            }, {
                id: 4,
                categoria: "Limpeza",
                preco: 1.7,
                nome: "Detergente"
            }]
        };
        this.changeModel = this.changeModel.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.changeProperty = this.changeProperty.bind(this);
    }

    componentWillMount() {
        if (this.props.idModel) {
            Pedido.get().then(function (produto) {
                this.setState({ model: produto });
            });
        }

        // Pedido.prototype.produto.get().then(function (produto) {

        // });

        // Pedido.prototype.cliente.get().then(function (produto) {

        // });

        this.state.texto = this.props.idModel ? "Editar" : "Criar";
    }

    changeModel(event) {
        this.state.model[event.target.name] = event.target.value;
        if (event.target.type == "number") {
            this.state.model[event.target.name] = Number(event.target.value);
        }
        this.setState(this.state);
    }
    changeProperty(name, value) {
        this.state.model[name] = value;
        this.setState(this.state);
        console.log(this.state);
    }
    submitForm() {
        console.log(this.state.model);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <h3>{this.props.id ? "Editar" : "Cadastrar"} Pedido</h3>
                    <form>
                        <div className="form-group">
                            <label className="control-label">Produto: </label>
                            <Select
                                items={this.state.produtoList}
                                name="produto"
                                callback={this.changeProperty}
                                textfield="nome"></Select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Cliente: </label>
                            <Select
                                items={this.state.produtoList}
                                name="cliente"
                                callback={this.changeProperty}
                                textfield="nome"></Select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Data: </label>
                            <input type="text" onChange={this.changeModel} className="form-control" name="quantidade" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Total: </label>
                            <input type="text" onChange={this.changeModel} className="form-control" name="data" />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Cadastrar pedido" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}