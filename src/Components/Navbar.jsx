import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserInfoContext } from "../Context/UserInfo";


import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CasinoIcon from '@mui/icons-material/Casino';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
    const { userInfo } = useContext(UserInfoContext);
    const location = useLocation();

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (location.pathname === "/")
            setValue(0)

        if (location.pathname === "/Recent")
            setValue(1)

        if (location.pathname === "/Profile")
            setValue(2)


    }, [location.pathname])



    return (
        <>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{ mt: "auto" }}
            >
                <BottomNavigationAction component={Link} to="/" label="Play" icon={<CasinoIcon />} sx={{ minWidth: "none", maxWidth: "none" }} />
                {
                    userInfo &&
                    <BottomNavigationAction component={Link} to="/Recent" label="Recents" icon={<HistoryIcon />} sx={{ minWidth: "none", maxWidth: "none" }} />
                }
                <BottomNavigationAction component={Link} to="/Profile" label="Profile" icon={
                    userInfo && userInfo.photoURL ?
                        <Avatar alt={userInfo.displayName} src={userInfo.photoURL} sx={{ width: "24px", height: "24px" }} /> :
                        <AccountCircleIcon />
                } sx={{ minWidth: "none", maxWidth: "none" }} />
            </BottomNavigation>
        </>
    )
}

export default Navbar