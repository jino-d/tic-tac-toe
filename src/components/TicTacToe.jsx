import { useContext } from "react";
import { TicTacToeContext } from "../context/tictactoe-context";
import useTicTacToe from "../hooks/useTicTacToe";

function TicTacToe({children}){
    const ticTacToeProps = useTicTacToe();
    return (
        <TicTacToeContext.Provider value={ticTacToeProps}>
            {children}
        </TicTacToeContext.Provider>
    )
}

export default TicTacToe