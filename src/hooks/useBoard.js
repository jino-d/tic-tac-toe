import { useState, useMemo, useEffect, useCallback} from 'react'

const useBoard = () => {
    let buttonArray = ['', '', '', '', '', '', '', '', '']

    const playerO = 'O'
    const playerX = 'X'
    const winningValues = [
        [0, 1, 2],[3, 4, 5],
        [6, 7, 8],[0, 3, 6],
        [1, 4, 7],[2, 5, 8],
        [0, 4, 8],[2, 4, 6]
    ];

    const [nextPlayer, setNextPlayer] =  useState(playerO)
    const [board, setBoard] = useState(buttonArray);
    const [currentPlayer, setCurrentPlayer] = useState(nextPlayer)
    const [hasWinner, setHasWinner] =  useState(false)
    const [draw, setDraw] =  useState(false)

    const onClickHandler = useCallback((value) => {
        setBoard(board.map((val, index) => {
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
    },[setCurrentPlayer, setBoard, board, currentPlayer, playerX, playerO])

    useEffect(() => {
        const dataset = board;
        let resultsX = [];
        let resultsO = [];
        for ( let i = 0 ; i < dataset.length; i++ ){
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
        } else if (!board.includes('')) {
            setDraw(true)
            setHasWinner(false)
        }
      }, [board, playerX, playerO, setHasWinner, setDraw]);


    const resetGame = useCallback(() =>{
        setBoard(buttonArray)
        setHasWinner(false)
        setDraw(false)
        setNextPlayer(nextPlayer==playerO? playerX : playerO)
    },[setBoard, setHasWinner, setDraw, setNextPlayer, nextPlayer, playerO, playerX])

    useEffect(() => {
        setCurrentPlayer(nextPlayer)
    }, [nextPlayer, setCurrentPlayer])

    const checkIfInWinningConditions = useCallback((results) => {
        for (let index = 0; index < winningValues.length; index++) {
            let winningStatus = true
            const winningCondition = winningValues[index];

            for (const element of winningCondition) {
                if (!results.includes(element)){
                    winningStatus = false
                }
            }
            if (winningStatus)
                return winningStatus
        }
        return false
    },[winningValues])

    const gameStatus = useMemo(() => {
        let playerNumber =  currentPlayer == playerO  ? 1 : 2

        if (hasWinner){
            return (
                `Player ${playerNumber} <${ currentPlayer == playerX? playerO: playerX }> wins!`
            )
        } else {
            if (draw){
                return (
                    `Draw!`
                )
            }
            return (
                `Turn for Player ${playerNumber} <${currentPlayer}>`
            )
        }
      }, [hasWinner, currentPlayer, draw, playerX, playerO]);
    return {
        gameStatus,
        board,
        hasWinner,
        draw,
        resetGame,
        onClickHandler
    }
}

export default useBoard