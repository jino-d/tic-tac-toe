import { useContext } from 'react'
import Tile from './Tile'
import { TicTacToeContext } from '../context/tictactoe-context'

export default function Board() {
    const {hasWinner, board, addPlayerToBoard } = useContext(TicTacToeContext)
    return (
        <div className='flex flex-row justify-center'>
            <div className="grid content-center flex grid-cols-3 min-w-[400px]">
                {board.map((value, index)=> {
                    return <Tile key={index} disabled={hasWinner} value={value} onClick={()=>addPlayerToBoard(index)}/>
                })}
            </div>
        </div>
    )
}