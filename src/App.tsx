import { useState } from "react";
import Game from "./components/Game";
import "./App.css";

function App() {

  return (
    <>
      <div>
        <h1>FIND THE IMPOSTOR</h1>
        <Game />
      </div>
    </>
  );
}

export default App;
