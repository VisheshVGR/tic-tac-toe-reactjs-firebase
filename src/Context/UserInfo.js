import React, { useState, useEffect, createContext } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase-config"

const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

const UserInfoContext = createContext();

const UserInfo = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserInfo(user);
                console.log(user);
            } else {
                setUserInfo(null);
            }
        });
    }, [])

    const LoginUsingGoogle = () => {
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                console.log("User is Signed in using Google!");
            }).catch((error) => {
                alert("Error enountered!");
                console.log(error);
            });
    }

    const LoginUsingFacebook = () => {
        signInWithPopup(auth, FacebookProvider)
            .then((result) => {
                console.log("User is Signed in using Facebook!");
            }).catch((error) => {
                alert("Error enountered!");
                console.log(error);
            });
    }

    const Logout = () => {
        signOut(auth).then(() => {
            console.log("User is Signed Out!");
        }).catch((error) => {
            alert("Error enountered!");
            console.log(error);
        });
    }


    return (
        <UserInfoContext.Provider value={{ LoginUsingGoogle, LoginUsingFacebook, Logout, userInfo }}>
            {children}
        </UserInfoContext.Provider>
    )
}

export { UserInfoContext }
export default UserInfo