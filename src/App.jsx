import "./App.css";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VisionBoard from "./VisionBoard.jsx";
import UpcomingEventsCard from "./UpcomingEventsCard.jsx";
import Projects from "./Projects.jsx";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vision-board" element={<VisionBoard />} />
            <Route path="/upcoming-events" element={<UpcomingEventsCard />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
