import React, { useEffect } from "react"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";

import BoardCell from "./BoardCell"

const board_style = {
    "display": "grid",
    "aspectRatio": "1 / 1",
    "width": "100%",
    "border": "5px solid #FFE79E",
    "gridTemplateColumns": "repeat(3, 1fr)",
    "background":"rgba(255,255,255,0.7)",
}


const Board = ({ currentGameInfo, myCard }) => {
    const { board, game_id, player_one_turn } = currentGameInfo;

    // updating cell status on click
    const handleCellClick = async (cell_no) => {
        let updated_board = board;
        board[cell_no] = myCard;

        const gameRef = doc(db, 'tic-tac-toe-games', game_id);
        await updateDoc(gameRef, {
            player_one_turn: !player_one_turn,
            board: updated_board,
        });
    }

    // check on every turn if someone won the game or game results in a draw
    useEffect(() => {
        const winnerFound = () => {
            const winnerLogic = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let logic of winnerLogic) {
                const [a, b, c] = logic;
                if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
                    return board[a];
                }
            }
            return false;
        }

        const checkDraw = () => {
            if (board.filter(x => x !== null).length === 9)
                return true;
            return false;
        }

        let isWinner = winnerFound();
        const gameRef = doc(db, 'tic-tac-toe-games', game_id);

        if (isWinner) {
            isWinner = isWinner === 'X' ? currentGameInfo.player_one.uid : currentGameInfo.player_two.uid;
            updateDoc(gameRef, {
                winner: isWinner,
            });
        } else if (checkDraw()) {
            updateDoc(gameRef, {
                winner: "Draw",
            });
        }

    }, [board, currentGameInfo.player_one.uid, currentGameInfo.player_two.uid, game_id])

    return (
        <>
            <div style={board_style}>
                <BoardCell cell_data={board[0]} handleCellClick={() => handleCellClick(0)} />
                <BoardCell cell_data={board[1]} handleCellClick={() => handleCellClick(1)} />
                <BoardCell cell_data={board[2]} handleCellClick={() => handleCellClick(2)} />
                <BoardCell cell_data={board[3]} handleCellClick={() => handleCellClick(3)} />
                <BoardCell cell_data={board[4]} handleCellClick={() => handleCellClick(4)} />
                <BoardCell cell_data={board[5]} handleCellClick={() => handleCellClick(5)} />
                <BoardCell cell_data={board[6]} handleCellClick={() => handleCellClick(6)} />
                <BoardCell cell_data={board[7]} handleCellClick={() => handleCellClick(7)} />
                <BoardCell cell_data={board[8]} handleCellClick={() => handleCellClick(8)} />
            </div>
        </>
    )
}

export default Board