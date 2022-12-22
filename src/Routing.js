import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


// Pages
import Home from "./Pages/Home/Home"
import Game from "./Pages/Game/Game"
import Profile from "./Pages/Profile/Profile"
import Recent from "./Pages/Recent/Recent"
import Navbar from "./Components/Navbar";

const Routing = () => {


    const WithNav = () => {
        return (
            <>
                <Outlet />
                <Navbar />
            </>
        );
    };


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