import "./App.css";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VisionBoard from "./VisionBoard";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vision-board" element={<VisionBoard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
