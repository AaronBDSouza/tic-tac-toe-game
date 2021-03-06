import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faUndo, faRedo  } from '@fortawesome/free-solid-svg-icons';

/*<React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/


function Square(props){
    return(
        <button className="square" onClick={() => props.onClick()} style={{ color: (props.clickCounter > 0 && props.value != null ? (props.value === 'X'?'blue':'#48d748'):'#efefef') }}> {''+props.value} </button>
    );
}

function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }   
    }
    return null;
}


class Board extends React.Component{

  renderSquare(i){
      return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} clickCounter={this.props.clickCounter}/>;
  }

  render(){
      return(
          <div className="boardBorder">
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
      );
  }
}


class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            clickCounter : 0,
            stepNumber: 0,
        };
        this.restoreCheckpointValue = React.createRef();
    }

    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();

        let clickCounter = this.state.clickCounter;

        clickCounter = clickCounter + 1;

        if(calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            history:history.concat([{
                squares:squares
            }]),
            xIsNext: !this.state.xIsNext,
            clickCounter: clickCounter,
            gameOver:false,
            stepNumber: history.length,
        });
    }

    getRestoreCheckPointValue(){
        const restoreCheckpointValue = this.restoreCheckpointValue.current.value;
        /*console.log(restoreCheckpointValue);*/
        this.jumpTo(restoreCheckpointValue);
        this.restoreCheckpointValue.current.value = "";
    }

    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext: (step % 2) === 0,
        });
        
    }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares);
        const moves = history.map((step,move) => {
            const moveDesc = move ?  'Go to move #' + move :'Go to game start';
            return(
                <option key={move} value={move}>{moveDesc}</option>
            );
        })

        let status; 

        if(winner){
            status = 'Player '+ (this.state.xIsNext ? 'O': 'X') + ' won!';
        }
        else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
        }

      return(
        <div>
            <div className="game-heading">
                <h1>Tic-Tac-Toe !</h1>   
            </div>       
            <div className="game">
                <div className="gameStatus">{status}</div>
                <div className="game-board">
                    <div className="boardContainer">
                        <div className="rowContainer">
                            <Board squares={current.squares} onClick={(i)=>this.handleClick(i)} clickCounter={this.state.clickCounter}/>
                        </div>
                    </div>    
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <div>{/* TODO */}</div>
                </div>
                <div className="buttonControls">

                    <button className="resetButton" onClick={() => this.jumpTo(0)}>
                        <span class="resettooltiptext">Reset Game</span>
                        <FontAwesomeIcon icon={faSyncAlt} size="3x" color="red"/>
                    </button>

                    <button className="undoButton" onClick={() => this.jumpTo((this.state.stepNumber > 0 ? this.state.stepNumber - 1 : 0))}>
                        <span class="undotooltiptext">Undo last move</span>
                        <FontAwesomeIcon icon={faUndo} size="3x" color="blue"/>
                    </button>

                    <button className="redoButton" onClick={() => this.jumpTo(this.state.stepNumber < this.state.history.length - 1 ? this.state.stepNumber + 1 : this.state.history.length - 1)}>
                        <span class="redotooltiptext">Redo last move</span>
                            <FontAwesomeIcon icon={faRedo} size="3x" color="green"/>
                    </button>

                </div>

                <div className="restoreDropdown">

                    <label className="restoreGamesLabel">Restore Game: </label>
                    <select ref={this.restoreCheckpointValue} onChange={() => this.getRestoreCheckPointValue()} style={{fontSize:`15px`}}>
                        <option defaultValue disabled value="">Select Checkpoint</option>
                        {moves}
                    </select>

                </div>    
            </div>    
        </div>
      );
  }
}

ReactDOM.render(<Game/>,document.getElementById('root'));
