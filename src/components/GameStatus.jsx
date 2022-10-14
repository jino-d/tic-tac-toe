import { useContext, useMemo } from "react"
import { TicTacToeContext } from "../context/tictactoe-context"

export default function GameStatus() {
    const {hasWinner, currentPlayer, draw, playerX, playerO } = useContext(TicTacToeContext)
    const gameStatus = useMemo(() => {
        let statusLabel = ''
        let playerNumber =  currentPlayer == playerO  ? 1 : 2
        if (hasWinner){
            statusLabel = `Player ${playerNumber} <${ currentPlayer == playerX? playerO: playerX }> wins!`
        } else {
            if (!draw) {
                statusLabel = `Turn for Player ${playerNumber} <${currentPlayer}>`
            } else {
                statusLabel = 'Draw!'
            }
        }
        return statusLabel
    }, [hasWinner, currentPlayer, draw, playerX, playerO]);
    return (
        <p className='text-center p-2'>
            {gameStatus}
        </p>
    )
}