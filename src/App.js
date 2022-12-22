import React from "react"
import './App.css';

import Routing from "./Routing"
import UserInfo from "./Context/UserInfo"

function App() {
  return (
    <>
      <UserInfo>
        <Routing />
      </UserInfo>
    </>
  );
}

export default App;
