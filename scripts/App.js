import React, { Component } from "react"
// eslint-disable-next-line no-unused-vars
import "./App.css"
import BaseCard from './Components/basecard/BaseCard.jsx';
const logo = require('../public/1_finsternis_karte.png');

class App extends Component {
    constructor() {
        super();
        
      }
    
      componentWillMount() {
          
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