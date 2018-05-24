import React, { Component } from "react";
import Cliente from "../../Models/Cliente";
import * as Widget from "../../Base/Widgets";
export default class ClienteForm extends Component {
    constructor() {
        super();
        this.state = {
            model: new Cliente()
        };
        this.changeModel = this.changeModel.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        if (this.props.id) {
            this.state.model.get(this.props.id).then(function (cliente) {
                cliente.__proto__ = Cliente.prototype;
                this.setState({ model: cliente });
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

    submitForm(event) {
        event.preventDefault();
        console.log(this.state.model);
        if (this.state.model._id) {
            this.state.model.put(this.state.model).then(function (res) {
                window.location.pathname = "cliente";
            });
        } else {
            this.state.model.post(this.state.model).then(function (res) {
                window.location.pathname = "cliente";
            });
        }
    }

    render() {
        console.log(this.props.id);
        return (
            <div className="row">
                <div className="col-md-4">
                    <h3>{this.props.texto} Cliente</h3>
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="nome" className="control-label">Nome: </label>
                            <input required name="nome" onChange={this.changeModel} value={this.state.model.nome} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email" className="control-label">Email: </label>
                            <input required name="email" onChange={this.changeModel} value={this.state.model.email} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email" className="control-label">Data de Nascimento: </label>
                            <Widget.DateTextbox required name="dataNascimento" callback={this.changeModel} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default">{this.state.texto}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}