import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const GameCard = ({ gameData, userInfo }) => {
    const navigate = useNavigate();

    const [myTurn, setMyTurn] = useState(true);


    // setting game players appropriately
    useEffect(() => {
        if (!(gameData && userInfo))
            return;

        if (gameData.player_two.uid === "" || userInfo.uid === gameData.player_two.uid) {
            setMyTurn(false);
        }

    }, [gameData, userInfo])

    // delete game
    const DeleteGame = async () => {

        await deleteDoc(doc(db, "tic-tac-toe-games", gameData.game_id));

    }

    return (
        <>
            <Card sx={{ width: "100%", overflow: "visible" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {
                            gameData.player_two.displayName === "" ? "Invite Opponent" :
                                `
                        Game with ${gameData.player_two.displayName}
                        `
                        }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {
                            gameData.winner === null ?
                                <>
                                    {
                                        gameData.player_two.displayName === "" ?
                                            <>
                                                Code :
                                                <Button size="large" variant="text" onClick={() => window.shareGameCode(gameData.game_id)}>{gameData.game_id}</Button>

                                            </> :
                                            gameData.player_one_turn !== myTurn ?
                                                <>
                                                    {gameData.player_two.displayName} just made their move!<br />
                                                    It's your turn to play now.
                                                </> :
                                                <>
                                                    You've made your move<br />
                                                    Waiting for them.
                                                </>
                                    }
                                </> :
                                <>
                                    {
                                        gameData.winner === "Draw" ? "It's a Draw!" :
                                            gameData.winner === userInfo.uid ?
                                                <span style={{ color: "#4caf50" }}>You won!</span> :
                                                <span style={{ color: "#ef5350" }}>Opponent won!</span>
                                    }
                                </>

                        }

                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-evenly" }}>
                    <Button variant="contained" sx={{ width: "30%" }} onClick={() => navigate(`/Game/${gameData.game_id}`)}>Continue</Button>
                    <Button variant="contained" sx={{ width: "30%" }} color="error" onClick={DeleteGame}>Delete</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default GameCard