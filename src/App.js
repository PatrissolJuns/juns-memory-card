import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Timer from "./Components/Timer/Timer";

class App extends Component {

  render() {
    return (
        <>
        <Header />
        <Timer timer={10} />
        </>
    );
  }

}

export default App;
