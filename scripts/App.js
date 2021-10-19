import React, { Component } from "react"
// eslint-disable-next-line no-unused-vars
import "./App.css"
import BaseCard from './Components/basecard/BaseCard.jsx';

class App extends Component {
    constructor() {
        super();   
        console.log("test");
    }
      
    
      render() {
        return(
            <div className="App">
            <BaseCard />
            </div>
        );
    }
}

export default App