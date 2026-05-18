import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import NotFound from "./errors/NotFound.tsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
