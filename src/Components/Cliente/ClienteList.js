import React, { Component } from "react";
import * as Widget from "../../Base/Widgets";
import Cliente from "../../Models/Cliente";
import {Link} from "react-router-dom";
import lodash from "lodash";

export default class ClienteList extends Component {
    constructor() {
        super();
        this.state = { clientes: [] };
        this.cliente = new Cliente();
        this.refresh = this.refresh.bind(this);
    }

    componentWillMount(){
        this.refresh();
    }

    refresh(){
        this.cliente.get().then(function(clientes){
            console.log(clientes);
            this.setState({ clientes: clientes });
        }.bind(this)).catch(function(err){
            alert("Não foi possível listar os clientes.")
        });
    }

    render() {
        return (<div>
            <h2>Clientes</h2>
            <Link to="/cliente/criar" className="btn btn-success pull-right">Cadastrar</Link>
            <table className="table">
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
                            return <ClienteItem refresh={this.refresh} key={cliente._id} model={cliente}></ClienteItem>
                        }.bind(this))
                    }
                </tbody>
            </table>
        </div>)
    }
}

export class ClienteItem extends Component {
    constructor() {
        super();
        this.state = { deleteVisible: false };
        this.cliente = new Cliente();
        this.excluirRegistro = this.excluirRegistro.bind(this);
        this.afterDelete = this.afterDelete.bind(this);
    }
    excluirRegistro() {
        this.setState({ deleteVisible: true });
    }

    afterDelete(res) {
        this.setState({ deleteVisible: false });
        if (res) {
            this.cliente.delete(this.props.model._id).then(function(){
                alert("Registro foi excluído com sucesso");
                this.props.refresh && this.props.refresh();
            }).catch(function(r){
                alert("Registro foi excluído: " + r.message);
            })
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
                <Link className="btn btn-warning" to={"/cliente/editar/" + this.props.model._id}>Editar</Link> | <a onClick={this.excluirRegistro} className="btn btn-danger">Deletar</a>
                <Widget.DeleteConfirmation callback={this.afterDelete} visible={this.state.deleteVisible}></Widget.DeleteConfirmation>
            </td>
        </tr>);
    }
}