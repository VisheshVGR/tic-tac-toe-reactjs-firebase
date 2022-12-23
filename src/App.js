import React from "react"
import './App.css';

import Routing from "./Routing"
import UserInfo from "./Context/UserInfo"

function App() {
  // share game 
  window.shareGameCode = (game_id) => {
    navigator.clipboard.writeText(game_id);
    if (navigator.share) {
      navigator.share({
        text: game_id,
        url: `https://tic-tac-toe-reactjs-firebase.vercel.app/Game/${game_id}`,
        title: "Tic Tac Toe game invite!",
      })
    }
  }
  return (
    <>
      <UserInfo>
        <Routing />
      </UserInfo>
    </>
  );
}

export default App;
