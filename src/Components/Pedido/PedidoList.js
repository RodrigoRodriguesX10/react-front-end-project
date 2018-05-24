import React, { Component } from "react";
import { Link } from "react-router-dom";
import lodash from "lodash";
import Pedido from "../../Models/Pedido";

export default class PedidoList extends Component {
    constructor() {
        super();
        this.state = { pedidos: [] };
        this.pedido = new Pedido();
    }
    
    componentWillMount(){
        this.pedido.get().then(function(pedidos){
            console.log(pedidos);
            this.setState({ pedidos: pedidos });
        }.bind(this)).catch(function(err){
            alert("Não foi possível listar os pedidos.")
        });
    }
    render() {
        return (<div>
            <h2>Pedidos</h2>
            <Link to="/pedido/criar" className="btn btn-success pull-right">Cadastrar</Link>
            <table className="table">
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
                            return <PedidoItem key={pedido._id} model={pedido}></PedidoItem>
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
        return (<tr {...this.props}>
            <td>
                {this.props.model.produto ? this.props.model.produto.nome : <span className="text-muted">--- produto excluído ---</span>}
            </td>
            <td>
                {this.props.model.cliente ? this.props.model.cliente.nome : <span className="text-muted">--- cliente excluído ---</span>}
            </td>
            <td>
                {this.props.model.quantidade}
            </td>
            <td>
                R$ {this.props.model.total.toFixed(2)}
            </td>
            <td>
                {this.props.model.data}
            </td>
            <td>
                <Link className="btn btn-default" to={"/pedido/ver/" + this.props.model._id}>Visualizar</Link>
            </td>
        </tr>);
    }
}