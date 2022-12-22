import React, { useContext, useState } from "react";
import { nanoid } from 'nanoid'
import { db } from "../../Firebase/Firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { UserInfoContext } from "../../Context/UserInfo";
import { Link, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Home = () => {
    const { userInfo } = useContext(UserInfoContext);
    const navigate = useNavigate();

    const [gameCode, setGameCode] = useState("");

    const StartNewGame = async () => {
        const game_id = nanoid();

        const gameRef = doc(db, 'tic-tac-toe-games', game_id);

        const game_data = {
            game_id: game_id,

            player_one: {
                uid: userInfo.uid,
                displayName: userInfo.displayName,
                email: userInfo.email,
                photoURL: userInfo.photoURL
            },

            player_two: {
                uid: "",
                displayName: "",
                email: "",
                photoURL: ""
            },

            player_one_turn: true,
            winner: null,
            board: Array(9).fill(null)
        }

        await setDoc(gameRef, game_data);

        navigate(`/Game/${game_id}`);
    }

    const JoinGameCode = () => {
        if (gameCode === "") {
            alert("Enter game code!")
            return
        }
        navigate(`/Game/${gameCode}`)
    }

    return (
        <>
            <Box className="menu_bg_img menu_center">
                <div className="menu_heading">
                    <Typography variant="h1" component="h1">Tic</Typography>
                    <Typography variant="h1" component="h1">Tac</Typography>
                    <Typography variant="h1" component="h1">Toe</Typography>
                </div>
                <div className="menu_center">
                    {
                        userInfo ?
                            <>
                                <Button onClick={StartNewGame} color="warning" variant="contained" size="large" sx={{ width: "100%" }}>New Game</Button>
                                <TextField
                                    value={gameCode}
                                    onChange={e => setGameCode(e.target.value)}
                                    variant="outlined"
                                    label="Enter Game Code"
                                    sx={{ "& input": { background: "white" } }}
                                    color="info"
                                />
                                <Button onClick={JoinGameCode} color="info" variant="contained" size="large" sx={{ width: "100%" }}>Join Code</Button>
                            </>
                            :
                            <Button onClick={() => navigate("/Profile")} color="warning" variant="contained" size="large" sx={{ width: "100%" }}>Login to play</Button>

                    }
                </div>

            </Box>

        </>
    )
}

export default Home