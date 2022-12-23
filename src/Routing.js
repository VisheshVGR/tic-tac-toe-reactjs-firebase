import React, { useContext } from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import { UserInfoContext } from "./Context/UserInfo";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// Pages
import Home from "./Pages/Home/Home"
import Game from "./Pages/Game/Game"
import Profile from "./Pages/Profile/Profile"
import Recent from "./Pages/Recent/Recent"
import Navbar from "./Components/Navbar";

const Routing = () => {
    const { userInfo } = useContext(UserInfoContext)

    const WithNav = () => {
        return (
            <>
                <Outlet />
                <Navbar />
            </>
        );
    };

    if (userInfo === "Loading") {
        return (
            <>
                <Container maxWidth="sm" sx={{ padding: 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100vh',
                            backgroundColor: "white",
                        }}
                    >
                        <Box className="game_ui menu_bg_img" style={{height:"100vh"}} >
                            <Box sx={{
                                margin: "5%",
                                padding: "5%",
                                borderRadius: "20px",
                                display: "flex",
                                justifyContent: "center",
                                flexFlow: "column nowrap",
                                alignItems: "center",
                                background: "linear-gradient(148deg, rgba(0,170,255,1) 0%,rgba(255,255,255,1) 50% , rgba(239,80,80,1) 100%) "
                            }}>
                                <Typography variant="h4" sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }} component="div">
                                    Loading...
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </>
        )
    }


    return (
        <>
            <Container maxWidth="sm" sx={{ padding: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        backgroundColor: "white",
                    }}
                >
                    {/* Page height = 100vh - 56px */}
                    <Routes>
                        <Route element={<WithNav />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/Recent" element={<Recent />} />
                        </Route>
                        <Route path="/Game/:current_game_id" element={<Game />} />
                    </Routes>
                </Box>
            </Container>

        </>
    )
}

export default Routing