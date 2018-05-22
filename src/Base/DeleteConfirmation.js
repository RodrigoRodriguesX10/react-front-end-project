import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class DeleteConfirmation extends Component {
    constructor() {
        super();
    }
    componentDidUpdate(){
        document.body.classList[this.props.visible ? "add" : "remove"]("modal-open");
    }
    render() {
        return (<div className="static-modal" hidden={!this.props.visible}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>

                <Modal.Body>Tem certeza de que deseja excluir esse registro?<br/>
                O processo não pode ser desfeito.</Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => this.props.callback(false)} bsStyle="danger">Não</Button>
                    <Button onClick={() => this.props.callback(true)} bsStyle="success">Sim</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>);
    }
}