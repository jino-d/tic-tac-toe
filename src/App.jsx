import {React, useState, useMemo, useEffect, useCallback, useReducer, useRef} from 'react'

const ReusableButton = (attr) => {
    return <button onClick={attr.onClick} disabled={attr.disabled} className="custom-button hover:bg-blue-500 hover:text-white hover:border-transparent">{attr.value}</button>;
}

function App() {
    let buttonArray = ['', '', '', '', '', '', '', '', '']
    const playerO = 'O'
    const playerX = 'X'
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const [nextPlayer, setNextPlayer] =  useState(playerO)
    const [buttonValue, setButtonValue] = useState(buttonArray);
    const [currentPlayer, setCurrentPlayer] = useState(nextPlayer)
    const [hasWinner, setHasWinner] =  useState(false)
    const [draw, setDraw] =  useState(false)
    const ref =  useRef(null)
    const myClickHandler = (value) => {
        setButtonValue(buttonValue.map((val, index) => {
            if (index == value && val == ''){
                val = currentPlayer
                if (currentPlayer == playerX)
                    setCurrentPlayer(playerO)
                else if(currentPlayer == playerO){
                    setCurrentPlayer(playerX)
                }
            }
            return val
        }))

    }
    useEffect(() => {
        const dataset = buttonValue;
        let resultsX = [];
        let resultsO = [];
        let i = 0
        for ( i ; i < dataset.length; i++ ){
            if ( dataset[i] == playerX ){
                resultsX.push(i);
            } else if( dataset[i] == playerO ){
                resultsO.push(i);
            }
        }
        if (checkIfInWinningConditions(resultsX)) {
            setHasWinner(true)
        } else if(checkIfInWinningConditions(resultsO)) {
            setHasWinner(true)
        } else if (!buttonValue.includes('')) {
            setDraw(true)
            setHasWinner(false)
        }
      }, [buttonValue]);
    const resetGame = () =>{
        setButtonValue(buttonArray)
        setHasWinner(false)
        setDraw(false)
        setNextPlayer(nextPlayer==playerO? playerX : playerO)
    }

    useEffect(() => {
        setCurrentPlayer(nextPlayer)
    }, [nextPlayer])

    const checkIfInWinningConditions = (results) => {
        for (let index = 0; index < winningConditions.length; index++) {
            let winningStatus = true
            const winningCondition = winningConditions[index];
            winningCondition.forEach(element => {
                if (!results.includes(element)){
                    winningStatus = false
                }
            });
            if (winningStatus == true)
                return winningStatus
        }
        return false
    }
    const value = useMemo(() => {
        let playerNumber =  currentPlayer == playerO  ? 1 : 2

        if (hasWinner){
            return (
                <>Player {playerNumber} &lt;{ currentPlayer == playerX? playerO: playerX }&gt; wins!</>
            )
        } else{
            if (draw){
                return (
                    <> Draw! </>
                )
            }
            return (
                <> Turn for Player {playerNumber} &lt;{currentPlayer}&gt; </>
            )
        }
      }, [hasWinner, currentPlayer, draw]);
    return (
        <>
            <h1 className="text-center text-5xl">Tic-Tac-Toe</h1>
            <div className="grid content-center flex grid-cols-3">
            <ReusableButton disabled={hasWinner} value={buttonValue[0]} onClick={()=>myClickHandler(0)}></ReusableButton>
            <ReusableButton disabled={hasWinner} value={buttonValue[1]} onClick={()=>myClickHandler(1)}></ReusableButton>
            <ReusableButton disabled={hasWinner} value={buttonValue[2]} onClick={()=>myClickHandler(2)}></ReusableButton>
            <ReusableButton disabled={hasWinner} value={buttonValue[3]} onClick={()=>myClickHandler(3)}></ReusableButton>
            <ReusableButton disabled={hasWinner} value={buttonValue[4]} onClick={()=>myClickHandler(4)}></ReusableButton>
            <ReusableButton disabled={hasWinner} value={buttonValue[5]} onClick={()=>myClickHandler(5)}></ReusableButton>
            <ReusableButton disabled={hasWinner} value={buttonValue[6]} onClick={()=>myClickHandler(6)}></ReusableButton>
            <ReusableButton disabled={hasWinner} value={buttonValue[7]} onClick={()=>myClickHandler(7)}></ReusableButton>
            <ReusableButton disabled={hasWinner} value={buttonValue[8]} onClick={()=>myClickHandler(8)}></ReusableButton>
            
            </div>
                <p className='text-center' ref={ref}>
                    {value}
                </p>
            <div className='flex flex-col items-center'>
                <button className='play-again-button hover:bg-blue-500 hover:text-white hover:border-transparent' hidden={hasWinner || draw? false : true} onClick={()=>resetGame()}> Play Again </button>
            </div>
        </>
    )
}

export default App