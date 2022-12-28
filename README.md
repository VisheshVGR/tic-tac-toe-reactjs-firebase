# Tic Tac Toe ( ReactJS + Firebase )
[GitHub Link](https://github.com/VisheshVGR/tic-tac-toe-reactjs-firebase) | [See live](https://tic-tac-toe-reactjs-firebase.vercel.app/)
 
## Table of Contents 📕
- [Tic Tac Toe ( ReactJS + Firebase )](#tic-tac-toe--reactjs--firebase-)
  - [Table of Contents 📕](#table-of-contents-)
  - [About the Challenge](#about-the-challenge)
  - [Tools and Technology](#tools-and-technology)
  - [Features](#features)
  - [Future Work](#future-work)
- [Gallery](#gallery)
- [Database Schema](#database-schema)
 
## About the Challenge
[Challenge Link](https://cedar-cub-c87.notion.site/Assignment-2-Full-Stack-Developer-the-homework-app-15daf2f75128429c98a5e2c3c9449ced)
* Build an asynchronous multiplayer Tic Tac Toe game.
* Essential features which were expected-
    * A playable mobile web frontend using ReactJS with making proper use of -
        * State management
        * Hooks
* This game should support - 
    * User management
        * Users can log in / register using basic info
        * Email id & username are unique per user
        * Once logged in, the user stays logged in until the cache is cleared from the browser
    * Starting an asynchronous game with anyone via their email id.
        * I can only have one ongoing game with any other user
        * Until that game is finished, I can’t start another game with the same user
        * I can start a game with anyone using their email id
        * As soon as the game is created, the initiator gets the first move & other user’s home page reflects the game
        * Every player sees ```X``` as their piece & ```O``` as the other player’s piece in every game
    * Gameplay
        * Should support standard 3x3 Tic Tac Toe game
        * The first player to put their piece in 3 consecutive squares wins the game
        * The game can be drawn too
        * These are the possible game states at any point in the game
            * Won
            * Drawn
            * Waiting for another player to play
            * Waiting for you to play
    * Home page
        * As soon as the games are started, a card is created for every game
        * These cards are sorted in descending order of their last updated time
            * Update only happens when the state of the game changes i.e.
                * When either players plays or
                * Game finishes
    * Layout
        * For the scope of this project, only mobile web layout shall be supported
        * [Figma Design Template](https://www.figma.com/file/w2TwxCIzgbVEsUOPVbYgOL?node-id=0:1)
 
## Tools and Technology
* The Front-end is created in **React.js** and **Material UI**. 
* For creating Back-end, we used **Firebase**. For the database, we used Google Firestore. We created a very flexible and versatile foundation for our codebase, so that in the future its functionality could be easily extended and new agents could be easily added to it.
* For the hosting we used **Vercel** which is a cloud platform that enables developers to host websites and web services that deploy instantly, scale automatically, and require no supervision.
 
## Features
 
* All Data is live-fetched and updated improving user experience.
* This is a single-page website with no refresh on page change enhancing page load speed.
* Matches are live and asynchronous also, the user can continue matches and donesn't need the opponent to be present at the same moment.
* Relevant messages to the user for all edge cases.
 
## Future Work
* User login/registration using Email / Password, social logins like Facebook, Github, etc.
* Themes for more personalization.
* UI for desktop screens.
* Add friend, Live chat, and Emoji features.
 

# Gallery

|                                                                                                                                                                 |                                                                                                                                                                             |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     <img width="1604" alt="Home Page" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/HomePage.png">  Home Page     |  <img width="1604" alt="Recent Games Page" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/RecentGames.png"> Recent Games Page  |
| <img width="1604" alt="Profile Page" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/ProfilePage.png"> Profile Page | <img width="1604" alt="Login Using Google" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/LoginGoogle.png"> Login Using Google |
|        <img width="1604" alt="My Turn" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/MyTurn.png"> My Turn         |     <img width="1604" alt="Opponent Turn" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/OpponentTurn.png"> Opponent Turn      |
|           <img width="1604" alt="I Won" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/IWon.png"> I Won            |       <img width="1604" alt="Opponent Won" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/OpponentWon.png"> Opponent Won       |
|     <img width="1604" alt="It's a Draw" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/draw.png"> It's a Draw      |            <img width="1604" alt="New Match" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/NewGame.png"> New Match            |

# Database Schema
<img height="500px" alt="Database Schema" src="https://raw.githubusercontent.com/VisheshVGR/tic-tac-toe-reactjs-firebase/main/Gallery/DB_Schema.png"> 
