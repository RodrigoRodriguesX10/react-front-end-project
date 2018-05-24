import React, { Component } from "react";
import Produto from "../../Models/Produto";

export default class ProdutoForm extends Component {
    constructor() {
        super();
        this.state = {
            model: new Produto()
        };
        this.changeModel = this.changeModel.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        if (this.props.id) {
            this.state.model.get(this.props.id).then(function (produto) {
                produto.__proto__ = Produto.prototype;
                this.setState({ model: produto });
            }.bind(this));
        }
        this.setState({ texto: this.props.id ? "Editar" : "Criar" });
    }

    changeModel(e, v) {
        var x = this.state.model;
        if ((e instanceof String) || (typeof e === "string")) {
            x[e] = v;
        } else {
            x[e.target.name] = e.target.value;
            if (e.target.type === "number") {
                x[e.target.name] = Number(e.target.value);
            }
        }
        this.setState({ model: x });
    }

    submitForm(event) {
        event.preventDefault();
        if (!event.target.noValidate) {
            console.log(this.state.model);
            if (this.state.model._id) {
                this.state.model.put(this.state.model).then(function (res) {
                    window.location.pathname = "produto";
                });
            } else {
                this.state.model.post(this.state.model).then(function (res) {
                    window.location.pathname = "produto";
                });
            }
        }
    }

    render() {
        console.log(this.props.id);
        return (
            <div className="row">
                <div className="col-md-4">
                    <h3>{this.state.texto} Produto</h3>
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="nome" className="control-label">Nome: </label>
                            <input required name="nome" onChange={this.changeModel} value={this.state.model.nome} className="form-control" />
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria" className="control-label">Categoria: </label>
                            <input required  name="categoria" onChange={this.changeModel} value={this.state.model.categoria} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preco" className="control-label">Preço (R$): </label>
                            <input required  name="preco" type="number" onChange={this.changeModel} value={this.state.model.preco} step="0.01" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricao" className="control-label">Descrição: </label>
                            <textarea required  name="descricao" onChange={this.changeModel} className="form-control" value={this.state.model.descricao}></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">{this.state.texto}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}