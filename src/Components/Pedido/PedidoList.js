import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../Base/DeleteConfirmation";
import lodash from "lodash";

export default class PedidoList extends Component {
    constructor() {
        super();
        this.state = { pedidos: [] };
    }
    render() {
        return (<div>
            <h2>Pedidos</h2>
            <Link to="/pedido/criar" className="btn btn-success pull-right">Cadastrar</Link>
            <table class="table">
                <thead>
                    <tr>
                        <th>
                            Produto
                    </th>
                        <th>
                            Cliente
                    </th>
                        <th>
                            Quantidade
                    </th>
                        <th>
                            Total
                    </th>
                        <th>
                            Data
                    </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lodash.map(this.state.pedidos, function (pedido, i) {
                            return <PedidoItem key={pedido.id} model={pedido}></PedidoItem>
                        })
                    }
                </tbody>
            </table>
        </div>)
    }
}

export class PedidoItem extends Component {
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
        return (<tr>
            <td>
                {this.props.model.produto.nome}
            </td>
            <td>
                {this.props.model.cliente.nome}
            </td>
            <td>
                {this.props.model.quantidade}
            </td>
            <td>
                {this.props.model.total}
            </td>
            <td>
                {this.props.model.data}
            </td>
            <td>
                <Link to={"/pedido/editar/" + this.props.model.id}>Editar</Link>
            </td>
        </tr>);
    }
}