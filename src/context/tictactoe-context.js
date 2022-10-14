import { createContext, useContext } from "react";

export const TicTacToeContext = createContext();

export default function useTicTacToeContext() {
    return values = useContext(TicTacToeContext);
}