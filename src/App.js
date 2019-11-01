import React from 'react';
import Button from "./components/Button"
import Input from "./components/Input"
import './App.css';
import ClearButton from './components/ClearButton';
import Math from "../node_modules/mathjs/dist/math";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      input: "",
      history: [],
    };
  }

  addToInput = val => {

    if (val === "="){
      try{
        let result = Math.evaluate(this.state.input);
        this.setState({input: result});
        
        this.setState({history: [...this.state.history, this.state.input]});


      } catch(err){
          alert("Enter valid Expression");
      }

    }
    else if(this.state.input === ""){
      if(val !== "*" && val !== "/"){
        this.setState({input : this.state.input + val})
      }
    }else {
      this.setState({input : this.state.input + val})
    }
  }

  addZeroToInput = val => {
    //if this.state is not empty then add zero
    if(this.state.input !== ""){
      this.setState({input : this.state.input + val})
    }
  }

  addDecimal = val => {
    //only add decimal only if there is no current decimal point persent in input area
    if(this.state.input.indexOf(".") === -1){ ///-1 means val is notThere..
      this.setState({input : this.state.input + val})
    }
  }

  clearInput = () => {
    this.setState({input: ""});
  }
  
render(){
  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + "/logo.png"} alt="" class="logo"/>
      <div className="calc-wrapper">
      <div className="history">
        {this.state.history.map((ele, i) => {
          return <React.Fragment key={i}>{ele}<br/></React.Fragment>
        })}
      </div>
        <div className="row">
          <Input>{this.state.input}</Input>
        </div>
        <div className="row">
          <Button handleClick={this.addToInput}>7</Button>
          <Button handleClick={this.addToInput}>8</Button>
          <Button handleClick={this.addToInput}>9</Button>
          <Button handleClick={this.addToInput}>/</Button>
        </div>
        <div className="row">
          <Button handleClick={this.addToInput}>4</Button>
          <Button handleClick={this.addToInput}>5</Button>
          <Button handleClick={this.addToInput}>6</Button>
          <Button handleClick={this.addToInput}>*</Button>
        </div>
        <div className="row">
          <Button handleClick={this.addToInput}>1</Button>
          <Button handleClick={this.addToInput}>2</Button>
          <Button handleClick={this.addToInput}>3</Button>
          <Button handleClick={this.addToInput}>+</Button>
        </div>
        <div className="row">
          <Button handleClick={this.addDecimal}>.</Button>
          <Button handleClick={this.addZeroToInput}>0</Button>
          <Button handleClick={this.addToInput}>=</Button>
          <Button handleClick={this.addToInput}>-</Button>
        </div>
        <div className="row">
          <ClearButton handleClear={this.clearInput}>Clear</ClearButton>
        </div>
      </div>
    </div>
  );
}
}

export default App;
