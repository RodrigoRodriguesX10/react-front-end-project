import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../Base/DeleteConfirmation";
import lodash from "lodash";

export default class ProdutoList extends Component {
    constructor() {
        super();
        this.state = {
            produtos: [{
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
    }
    render() {
        return (<div style={{margin: "15px"}}>
            <p style={{margin: "5px"}}>
                <Link to="/produto/criar" className="btn btn-success">+ Adicionar Produto</Link>
            </p>
            <h2>Lista de Produtos</h2>
            <div id="products" className="row list-group">
                {
                    lodash.map(this.state.produtos, function (produto, i) {
                        return <ProdutoItem key={produto.id} model={produto}></ProdutoItem>
                    })
                }
            </div>
        </div>)
    }
}

export class ProdutoItem extends Component {
    constructor() {
        super();
        this.state = { deleteVisible: false }
        this.excluirRegistro = this.excluirRegistro.bind(this);
        this.afterDelete = this.afterDelete.bind(this);
    }
    excluirRegistro() {
        this.setState({ deleteVisible: true });
    }

    afterDelete(res) {
        this.setState({ deleteVisible: false });
        if (res) {
            alert("Você deletou o registro");
        } else {
            alert("Registro não foi deletado");
        }
    }

    render() {
        return (<div key={this.props.model.id} className="item col-xs-4 col-lg-4">
            <div className="thumbnail" style={{height: "350px"}}>
                <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                <div className="caption">
                    <h4 className="group inner list-group-item-heading">
                        {this.props.model.nome} - {this.props.model.id}
                    </h4>
                    <p className="group inner list-group-item-text">
                        {this.props.model.categoria} - 
                        Produto inserido aqui só pra testar mesmo
                </p>
                    <div className="row last">
                        <div className="col-xs-12 col-md-6">
                            <p className="lead">
                                R$ {this.props.model.preco.toFixed(2)}
                            </p>
                        </div>
                        <div className="col-xs-12 col-md-3">
                            <Link className="btn btn-warning" to={'/produto/editar/' + this.props.model.id} params={{ id: this.props.model.id }}>Editar</Link>
                        </div>
                        <div className="col-xs-12 col-md-3">
                            <a className="btn btn-danger" onClick={this.excluirRegistro}>Excluir</a>
                        </div>
                    </div>
                </div>
                <DeleteConfirmation callback={this.afterDelete} visible={this.state.deleteVisible}></DeleteConfirmation>
            </div>
        </div>);
    }
}