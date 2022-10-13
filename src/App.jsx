import Tile from './components/Tile'
import useBoard from './hooks/useBoard'

function App() {
    let tictactoeBoard = useBoard();
    let tiles = tictactoeBoard.board.map((value, index)=> {
        return <Tile key={index} disabled={tictactoeBoard.hasWinner} value={value} onClick={()=>tictactoeBoard.onClickHandler(index)}/>
    })

    return (
        <>
            <h1 className="text-center text-5xl">Tic-Tac-Toe</h1>
            <div className='flex flex-row justify-center'>
                <div className="grid content-center flex grid-cols-3  min-w-[500px]">
                {tiles}
                </div>
            </div>
                <p className='text-center'>
                    {tictactoeBoard.gameStatus}
                </p>
            <div className='flex flex-col items-center'>
                <button className='play-again-button hover:bg-blue-500 hover:text-white hover:border-transparent' hidden={tictactoeBoard.hasWinner || tictactoeBoard.draw? false : true} onClick={()=>tictactoeBoard.resetGame()}> Play Again </button>
            </div>
        </>
    )
}

export default App