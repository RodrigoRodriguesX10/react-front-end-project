import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo from './logo.svg';

class MainHeader extends Component {
    constructor(){
        super();
    }
    render() {
        return (
        <header className="navbar navbar-expand-lg App-header">
            <div className="navbar-brand">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="navbar-brand">
                React {this.state.texto}
            </div>
            <div className="collapse navbar-collapse container">
                <div className="header">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/produto">Produtos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="./pedido">Pedidos</Link>
                        </li>
                        <li className="nav-item">
                            <input type="text" value={this.state.texto}/>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        )
    }
}

export default MainHeader;