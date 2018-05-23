import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import lodash from "lodash";
export default class Select extends Component {
    constructor() {
        super();
        this.onSelect = this.onSelect.bind(this);
        this.state = { selected: {}};
    }
    onSelect(i) {
        this.setState({selected: this.props.items[i] || {}});
        this.props.callback(this.props.name, this.props.items[i]);
    }
    render() {
        return (<div className="dropdown">
            <DropdownButton
                title={this.state.selected[this.props.textfield] || this.props.optionLabel || "Selecione uma opção"}>
                {
                    lodash.map(this.props.items, function (item, index) {
                        return <MenuItem eventKey={index} onSelect={() => this.onSelect(index)} >{item[this.props.textfield]}</MenuItem>
                    }.bind(this))
                }
            </DropdownButton>
        </div>)
    }
}