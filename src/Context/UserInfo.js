import React, { useState, useEffect, createContext } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase-config"

const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

const UserInfoContext = createContext();

const UserInfo = ({ children }) => {
    const [userInfo, setUserInfo] = useState("Loading");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserInfo(user);
            } else {
                setUserInfo(null);
            }
        });
    }, [])

    const LoginUsingGoogle = () => {
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
            }).catch((error) => {
                alert(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "));
                console.log(error);
            });
    }

    const LoginUsingFacebook = () => {
        signInWithPopup(auth, FacebookProvider)
            .then((result) => {
            }).catch((error) => {
                alert(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "));
                console.log(error);
            });
    }

    const Logout = () => {
        signOut(auth).then(() => {
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