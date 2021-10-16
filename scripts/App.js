import React, { Component } from "react"
// eslint-disable-next-line no-unused-vars
import "./App.css"
import BaseCard from './Components/basecard/BaseCard.jsx';


class App extends Component {
    constructor() {
        super();
        
      }
    
      componentWillMount() {
      }
    
      render() {
        return(
            <div className="App">
            <img src="./assets/loadingGif.gif" />
            <BaseCard />
            </div>
        );
    }
}

export default App