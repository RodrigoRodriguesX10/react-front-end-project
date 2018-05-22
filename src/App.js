import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import MainPage from "./MainPage";

import "./bootstrap.css";
import "./app.css";

class App extends Component {
  render() {
    var x = 1000;
    return (
      <div>
        <MainHeader valor={x}/>
        <MainPage />
      </div>
    );
  }
}

export default App;