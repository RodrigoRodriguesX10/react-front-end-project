import React, { Component } from "react";
import * as Widget from "../../Base/Widgets";
import { Link } from "react-router-dom";
import lodash from "lodash";
import Produto from "../../Models/Produto";

export default class ProdutoList extends Component {
    constructor() {
        super();
        this.state = {
            produtos: [],
        };
        this.produto = new Produto();
    }

    componentWillMount() {
        this.produto.get().then(function (produtos) {
            console.log(produtos);
            this.setState({ produtos: produtos });
        }.bind(this)).catch(function (err) {
            alert("Não foi possível listar os produtos.")
        });
    }

    render() {
        return (<div style={{ margin: "15px" }}>
            <p style={{ margin: "5px" }}>
                <Link to="/produto/criar" className="btn btn-success">+ Adicionar Produto</Link>
            </p>
            <h2>Lista de Produtos</h2>
            <div id="products" className="row list-group">
                {
                    lodash.map(this.state.produtos, function (produto, i) {
                        return <ProdutoItem key={produto._id} model={produto}></ProdutoItem>
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
            <div className="thumbnail" style={{ height: "350px" }}>
                <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                <div className="caption">
                    <h4 className="group inner list-group-item-heading">
                        {this.props.model.nome}
                    </h4>
                    <h5 className="group inner list-group-item-text">
                        {this.props.model.categoria}
                    </h5>
                    <p title={this.props.model.descricao} className="group inner list-group-item-text" style={{
                        width: "250px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}>
                        {this.props.model.descricao}
                    </p>
                    <div className="row last">
                        <div className="col-xs-12 col-md-6">
                            <p className="lead">
                                R$ {this.props.model.preco.toFixed(2)}
                            </p>
                        </div>
                        <div className="col-xs-12 col-md-3">
                            <Link className="btn btn-warning" to={'/produto/editar/' + this.props.model._id} params={{ id: this.props.model.id }}>Editar</Link>
                        </div>
                        <div className="col-xs-12 col-md-3">
                            <a className="btn btn-danger" onClick={this.excluirRegistro}>Excluir</a>
                        </div>
                    </div>
                </div>
                <Widget.DeleteConfirmation callback={this.afterDelete} visible={this.state.deleteVisible}></Widget.DeleteConfirmation>
            </div>
        </div>);
    }
}