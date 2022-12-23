import React, { useContext } from "react";
import { UserInfoContext } from "../../Context/UserInfo";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const Profile = () => {
    const { LoginUsingGoogle, LoginUsingFacebook, Logout, userInfo } = useContext(UserInfoContext);
    console.log(userInfo);

    return (
        <>

            <Box className="menu_bg_img" sx={{ display: "flex", flexFlow: "column nowrap" }}>
                <Box className="menu_heading">
                    <Typography variant="h1" component="h1">{userInfo ? "Profile" : "Login"}</Typography>
                </Box>
                <Box sx={{ overflow: "auto", flexGrow: "1", display: "flex", flexFlow: "column nowrap", gap: "20px", justifyContent: "start", alignItems: userInfo ? "start" : "center" }}>
                    {
                        !userInfo ?
                            <>
                                <Button variant="contained" size="large" onClick={LoginUsingGoogle}>Login using Google</Button>
                                {/* <Button variant="contained" size="large" onClick={LoginUsingFacebook}>Login using Facebook</Button> */}
                            </>
                            : <>
                                <Avatar sx={{ margin: "0 auto", height: "100px", width: "100px" }} alt={userInfo.displayName} src={userInfo.photoURL} />
                                <Typography className="menu_heading" variant="h4" component="h4">UID</Typography>
                                <TextField
                                    value={userInfo.uid}
                                    variant="outlined"
                                    sx={{ background: "white", width: "100%" }}
                                />
                                <Typography className="menu_heading" variant="h4" component="h4">Name</Typography>
                                <TextField
                                    value={userInfo.displayName}
                                    variant="outlined"
                                    sx={{ background: "white", width: "100%" }}
                                />
                                <Typography className="menu_heading" variant="h4" component="h4">Email</Typography>
                                <TextField
                                    value={userInfo.email}
                                    variant="outlined"
                                    sx={{ background: "white", width: "100%" }}
                                />


                                <Button variant="contained" color="error" sx={{ width: "100%", marginTop:"auto" }} size="large" onClick={Logout}>Logout</Button>
                            </>
                    }
                </Box>

            </Box>
        </>
    )
}

export default Profile