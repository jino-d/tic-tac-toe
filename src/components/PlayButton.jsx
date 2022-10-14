import { useContext } from 'react'
import { TicTacToeContext } from '../context/tictactoe-context'

export default function PlayButton() {
    const {hasWinner, draw, resetGame} = useContext(TicTacToeContext)
    return ( 
        <div className='flex flex-col items-center'>
            <button className='play-again-button hover:bg-blue-500 hover:text-white hover:border-transparent' hidden={hasWinner || draw? false : true} onClick={()=>resetGame()}> Play Again </button>
        </div>
    )
}