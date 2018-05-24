import React, { Component } from "react";
import * as Bootstrap from "react-bootstrap";
import lodash from "lodash";

export class Select extends Component {
    constructor() {
        super();
        this.onSelect = this.onSelect.bind(this);
        this.state = { selected: {} };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.selected !== this.props.selected){
            this.setState({ selected: nextProps.selected });
        }
    }

    onSelect(i) {
        this.setState({ selected: this.props.items[i] || {} });
        this.props.callback(this.props.name, this.props.items[i]);
    }
    render() {
        return (<div className="dropdown">
            <Bootstrap.DropdownButton id={this.props.id}
                title={this.state.selected[this.props.textfield] || this.props.optionLabel || "Selecione uma opção"}>
                {
                    lodash.map(this.props.items, function (item, index) {
                        return <Bootstrap.MenuItem className={this.state.selected._id === item._id ? "label-primary" : ""} eventKey={index} key={index} onSelect={() => this.onSelect(index)} >{item[this.props.textfield]}</Bootstrap.MenuItem>
                    }.bind(this))
                }
            </Bootstrap.DropdownButton>
        </div>)
    }
}

export class DeleteConfirmation extends Component {
    componentDidUpdate() {
        document.body.classList[this.props.visible ? "add" : "remove"]("modal-open");
    }
    render() {
        return (<div className="static-modal" hidden={!this.props.visible}>
            <Bootstrap.Modal.Dialog>
                <Bootstrap.Modal.Header>
                    <Bootstrap.Modal.Title>Confirmar Exclusão</Bootstrap.Modal.Title>
                </Bootstrap.Modal.Header>

                <Bootstrap.Modal.Body>Tem certeza de que deseja excluir esse registro?<br />
                    O processo não pode ser desfeito.</Bootstrap.Modal.Body>

                <Bootstrap.Modal.Footer>
                    <Bootstrap.Button onClick={() => this.props.callback(false)} bsStyle="danger">Não</Bootstrap.Button>
                    <Bootstrap.Button onClick={() => this.props.callback(true)} bsStyle="success">Sim</Bootstrap.Button>
                </Bootstrap.Modal.Footer>
            </Bootstrap.Modal.Dialog>
        </div>);
    }
}

export class DateTextbox extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = { texto: "" };
    }

    textFromDate(data){
        const x = new Date(data);
        if(!isNaN(x.valueOf())){
            const t = x.toISOString().substr(0,10);
            return t;
        }
        return "";
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.valor && nextProps.valor != this.props.valor){
            this.setState({ texto: this.textFromDate(nextProps.valor) })
        }
    }

    onChange(i) {
        this.setState({ texto: i.target.value });
        var x = new Date(i.target.value);
        if(!isNaN(x.valueOf())){
            this.props.callback(this.props.name, x);
        }
    }
    render() {
        return (<input type="date" className="form-control" onChange={this.onChange} name={this.props.name} value={this.state.texto} />);
    }
}

export class DateTimeTextbox extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = { texto: "" };
    }

    textFromDate(data){
        const x = new Date(data);
        if(!isNaN(x.valueOf())){
            const t = x.toISOString().substr(0,10);
            return t;
        }
        return "";
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.valor && nextProps.valor != this.props.valor){
            this.setState({ texto: this.textFromDate(nextProps.valor) })
        }
    }

    onChange(i) {
        this.setState({ texto: i.target.value });
        var x = new Date(i.target.value);
        if(!isNaN(x.valueOf())){
            this.props.callback(this.props.name, x);
        }
    }
    render() {
        return (<input type="datetime" className="form-control" onChange={this.onChange} name={this.props.name} value={this.state.texto} />);
    }
}
