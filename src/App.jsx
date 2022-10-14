
import Header from './components/Header';
import PlayButton from './components/PlayButton';
import Board from './components/Board';
import TicTacToe from './components/TicTacToe';
import GameStatus from './components/GameStatus';

function App() {
    return (
        <TicTacToe>
            <Header />
            <Board />
            <GameStatus />
            <PlayButton />
        </TicTacToe>
    )
}

export default App