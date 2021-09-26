import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/



// class Square extends React.Component{
//     render(){
//         return(
//             <button className="square" onClick={() => this.props.onClick()}>{this.props.value}</button>
//         );
//     }
// }

function Square(props){
    return(
        <button className="square" onClick={() => props.onClick()}>{props.value}</button>
    );
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            squares:squares,
            xIsNext: !this.state.xIsNext,
        });
    }

  renderSquare(i){
      return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)}/>;
  }

  render(){
      const status = 'Next player: ' + (this.xIsNext ? 'X': 'O');

      return(
          <div className="boardContainer">
            <div className="status">{status}</div>
            <div className="rowContainer">
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>    
            </div>            
          </div>
      );
  }
}

class Game extends React.Component{
  render(){
      return(
          <div>
            <div className="game-heading">
                <h1>Tic-Tac-Toe</h1>   
            </div>       
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <div>{/* TODO */}</div>
                </div>
            </div>
          </div>


      );
  }
}

ReactDOM.render(<Game/>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
