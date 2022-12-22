import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase-config";
import { UserInfoContext } from "../../Context/UserInfo";
import { useNavigate } from "react-router-dom";

import Board from "./Board";
import GameBg from "../../Assets/game_bg.jpeg"
import Cross from "../../Assets/cross.png"
import Circle from "../../Assets/circle.png"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const Game = () => {
    const navigate = useNavigate();
    const { current_game_id } = useParams();
    const { userInfo } = useContext(UserInfoContext);

    const [currentGameInfo, setCurrentGameInfo] = useState(null);
    const [infoScreenMessage, setInfoScreenMessage] = useState("Loading...");

    const [myCard, setMyCard] = useState("X");
    const [myTurn, setMyTurn] = useState(true);

    // check if user is logged in or not
    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo])

    // fetching data for current game
    useEffect(() => {
        const gameRef = doc(db, 'tic-tac-toe-games', current_game_id);

        const unsub = onSnapshot(gameRef, (doc) => {
            setCurrentGameInfo(doc.data());
            console.log("Current game: ", doc.data());
        });

        return (() => {
            unsub();
        })
    }, [current_game_id])

    // setting game players appropriately
    useEffect(() => {
        if (!(currentGameInfo && userInfo))
            return;

        if (userInfo.uid === currentGameInfo.player_one.uid) {
            setMyCard("X")
            setMyTurn(true);
            setInfoScreenMessage(null);
        } else if (currentGameInfo.player_two.uid === "") {
            const gameRef = doc(db, 'tic-tac-toe-games', current_game_id);
            updateDoc(gameRef, {
                player_two: {
                    uid: userInfo.uid,
                    displayName: userInfo.displayName,
                    email: userInfo.email,
                    photoURL: userInfo.photoURL
                }
            });

            setMyCard("O");
            setMyTurn(false);
            setInfoScreenMessage(null);
        } else if (userInfo.uid === currentGameInfo.player_two.uid) {
            setMyCard("O");
            setMyTurn(false);
            setInfoScreenMessage(null);
        } else {
            setInfoScreenMessage("Game has already begun!");
        }

    }, [currentGameInfo, current_game_id, userInfo])

    if (infoScreenMessage) {
        return (
            <>{infoScreenMessage}</>
        )
    }

    return (
        <>

            <Box className="game_ui" sx={{ background: `url(${GameBg})` }}>
                <Box sx={{ display: "flex", justifyContent: 'space-between', padding: "5% 5% 0" }}>
                    <IconButton sx={{ color: "white" }} aria-label="Home" onClick={() => navigate("/")}>
                        <HomeIcon />
                    </IconButton>
                    <Button color="warning" variant="text" onClick={() => navigator.clipboard.writeText(current_game_id)}>{current_game_id} <ContentCopyIcon /></Button>
                </Box>
                <Box sx={{
                    background: " linear-gradient(90deg, rgba(44,141,255,1) 0%, rgba(255,255,255,0) 100%, rgba(0,212,255,0) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "10px",
                    color: "white",
                    padding: "10px 0 10px 5%",
                }}>
                    <Avatar alt={currentGameInfo.player_one.displayName} src={currentGameInfo.player_one.photoURL} />
                    {currentGameInfo.player_one.displayName} |
                    <Typography variant="caption" component="p" sx={{ color: "#bbb" }}>
                        {currentGameInfo.player_one.email}
                    </Typography>
                </Box>
                <Box sx={{
                    background: " linear-gradient(270deg, rgba(255,79,79,1) 0%, rgba(255,255,255,0) 100%, rgba(0,212,255,0) 100%)",
                    paddingRight: "5%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: "10px",
                    color: "white",
                    padding: "10px 5% 10px 0",
                }}>
                    <Typography variant="caption" component="p" sx={{ color: "#bbb" }}>
                        {currentGameInfo.player_two.email}
                    </Typography>
                    | {currentGameInfo.player_two.displayName}
                    <Avatar alt={currentGameInfo.player_two.displayName} src={currentGameInfo.player_two.photoURL} />
                </Box>

                <Box sx={{ padding: "5%", position: "relative" }}>
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        zIndex: "1",
                        display: currentGameInfo.player_one_turn === myTurn ? "none" : "block",
                    }} />
                    <Board currentGameInfo={currentGameInfo} myCard={myCard} />
                </Box>

                <Box sx={{
                    flexGrow: "1",
                    margin: "0 5% 5%",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(148deg, rgba(0,170,255,1) 0%,rgba(255,255,255,1) 50% , rgba(239,80,80,1) 100%) "
                }}>
                    <Typography variant="h4" sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }} component="div">

                        {
                            currentGameInfo.winner === null ?
                                <>
                                    {
                                        currentGameInfo.player_two.displayName === "" ?
                                            <>
                                                <Button sx={{ color: "white" }} variant="text" onClick={() => navigator.clipboard.writeText(current_game_id)}>Invite Player</Button>
                                            </> :
                                            currentGameInfo.player_one_turn !== myTurn ?
                                                <>
                                                    Opponent move!
                                                    {
                                                        currentGameInfo.player_one.uid === userInfo.uid ?
                                                            <img src={Circle} alt="circle" style={{ width: "1.5ch", height: "1.5ch" }} /> :
                                                            <img src={Cross} alt="oval" style={{ width: "2ch", height: "2ch" }} />
                                                    }

                                                </> :
                                                <>
                                                    Your move!
                                                    {
                                                        currentGameInfo.player_one.uid === userInfo.uid ?
                                                            <img src={Cross} alt="oval" style={{ width: "2ch", height: "2ch" }} /> :
                                                            <img src={Circle} alt="circle" style={{ width: "1.5ch", height: "1.5ch" }} />
                                                    }

                                                </>
                                    }
                                </> :
                                <>
                                    {
                                        currentGameInfo.winner === "Draw" ? "It's a Draw!" :
                                            currentGameInfo.winner === userInfo.uid ?
                                                <span style={{ color: "#4caf50" }}>You won!</span> :
                                                <span style={{ color: "#ef5350" }}>Opponent won!</span>
                                    }
                                </>

                        }

                    </Typography>
                </Box>

            </Box>


        </>
    )
}

export default Game