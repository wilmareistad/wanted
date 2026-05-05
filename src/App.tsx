import { useState } from "react";
import Game from "./components/Game";
import "./App.css";

function App() {

  return (
    <>
    <main>
      <div>
        <h1>FIND THE IMPOSTOR</h1>
        <Game />
      </div>
    </main>
    </>
  );
}

export default App;
