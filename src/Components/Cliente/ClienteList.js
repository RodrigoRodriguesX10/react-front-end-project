import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../Base/DeleteConfirmation";
import lodash from "lodash";

export default class ClienteList extends Component {
    constructor() {
        super();
        this.state = { clientes: [] };
    }
    render() {
        return (<div>
            <h2>Clientes</h2>
            <Link to="/cliente/criar" className="btn btn-success pull-right">Cadastrar</Link>
            <table class="table">
                <thead>
                    <tr>
                        <th>
                            Nome
                    </th>
                        <th>
                            Email
                    </th>
                        <th>
                            Data de Nascimento
                    </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lodash.map(this.state.clientes, function (cliente, i) {
                            return <ClienteItem key={cliente.id} model={cliente}></ClienteItem>
                        })
                    }
                </tbody>
            </table>
        </div>)
    }
}

export class ClienteItem extends Component {
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
                {this.props.model.nome}
            </td>
            <td>
                {this.props.model.email}
            </td>
            <td>
                {this.props.model.dataNascimento}
            </td>
            <td>
                <Link to={"/cliente/editar/" + this.props.model.id}>Editar</Link> |
                <a className="btn btn-danger">Deletar</a>
                <DeleteConfirmation callback={this.afterDelete} visible={this.state.deleteVisible}></DeleteConfirmation>
            </td>
        </tr>);
    }
}