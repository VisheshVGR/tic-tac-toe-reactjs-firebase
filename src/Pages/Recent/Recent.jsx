import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../Context/UserInfo";
import { db } from "../../Firebase/Firebase-config";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import GameCard from "./GameCard"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Recent = () => {
    const { userInfo } = useContext(UserInfoContext);
    const navigate = useNavigate();

    const [myGames, setMyGames] = useState([])

    // check if user is logged in or not
    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo])

    // Loading my all played games
    useEffect(() => {
        if (!userInfo)
            return;

        const gamesRef = collection(db, 'tic-tac-toe-games');

        const que1 = query(gamesRef, where("player_one.uid", "==", userInfo.uid));
        const unsubscribe1 = onSnapshot(que1, (querySnapshot) => {
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push(doc.data());
            });
            setMyGames(result)
        });

        const que2 = query(gamesRef, where("player_two.uid", "==", userInfo.uid));
        const unsubscribe2 = onSnapshot(que2, (querySnapshot) => {
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push(doc.data());
            });
            setMyGames(current => [...current, ...result]);
        });

        return (() => {
            unsubscribe1();
            unsubscribe2();
        })

    }, [userInfo])


    return (
        <>

            <Box className="menu_bg_img" sx={{ display: "flex", flexFlow: "column nowrap" }}>
                <Box className="menu_heading">
                    <Typography variant="h1" component="h1">My Games</Typography>
                </Box>
                <Box sx={{ overflow: "auto", flexGrow: "1", display: "flex", flexFlow: "column nowrap", gap: "20px", justifyContent: "start", alignItems: "center" }}>

                    {
                        myGames.map((gameData) => {
                            return (
                                <>
                                    <GameCard gameData={gameData} userInfo={userInfo} key={gameData.game_id} />
                                </>
                            )
                        })
                    }
                    {
                        myGames.length === 0 &&
                        <>
                            <Typography sx={{ color: "white" }} variant="h6" component="p">- No match record -</Typography>
                        </>
                    }
                </Box>

            </Box>
        </>
    )
}

export default Recent