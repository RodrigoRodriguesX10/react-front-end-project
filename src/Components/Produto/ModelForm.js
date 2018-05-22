import React, { Component } from "react";
import Produto from "../../Models/Produto";

export default class ModelForm extends Component {
    constructor(){
        super();
        this.state = {
            model: {}
        };
        this.changeModel = this.changeModel.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount(){
        if(this.props.idModel){
            Produto.get().then(function(produto){
                this.setState({ model: produto });
            });
        }
        this.state.texto = this.props.idModel ? "Editar" : "Criar";
    }

    changeModel(event) {
        this.state.model[event.target.name] = event.target.value;
        if(event.target.type == "number"){
            this.state.model[event.target.name] = Number(event.target.value);
        }
        this.setState(this.state);
    }

    submitForm(){
        console.log(this.state.model);
    }

    render() {
        console.log(this.props.id);
        return (
            <div className="row">
                <div className="col-md-4">
                    <form >
                        <div className="form-group">
                            <label htmlFor="Nome" className="control-label">Nome: </label>
                            <input name="Nome" onChange={this.changeModel} value={this.state.model.nome} className="form-control" />
                            <span  className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Categoria" className="control-label">Categoria: </label>
                            <input name="Categoria" onChange={this.changeModel} value={this.state.model.categoria} className="form-control" />
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Preco" className="control-label">Preço (R$): </label>
                            <input name="Preco" type="number" onChange={this.changeModel} value={this.state.model.preco} step="0.01" className="form-control" />
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Descricao" className="control-label">Descrição: </label>
                            <textarea name="Descricao" onChange={this.changeModel} className="form-control">{this.state.model.categoria}</textarea>
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <button onClick={this.submitForm} type="button" className="btn btn-default">{this.state.texto}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}