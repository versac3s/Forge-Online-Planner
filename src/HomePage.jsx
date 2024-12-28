import { useState } from "react";
import "./HomePage.css";
import plannerImage from "./assets/Planner.png";
import visionImage from "./assets/Vision.png";
import projectImage from "./assets/Projects.png";
import notesImage from "./assets/Notes.png";
export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(""); // Clear input field
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <a href="/calendar">CALENDER</a>
          </li>
          <li>
            <a href="/vision-board">VISION BOARD</a>
          </li>
          <li>
            <a href="/projects">PROJECTS</a>
          </li>
          <li>
            <a href="/notes">NOTES</a>
          </li>
        </ul>
      </nav>
      <hr></hr>
      <div className="h-screen w-full flex">
        {/* Sidebar */}
        <div className="w-1/6 flex flex-col py-8">
          <div className="image-wrapper w-full h-[300px]">
            <img
              src={notesImage}
              alt="a cute message for you"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-end flex-grow space-y-4 mt-auto">
            <button className="bg-gray-200 py-2 px-4 rounded-full transform rotate-3 shadow-md w-50 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-pink-400 hover:shadow-lg font-arial ml-5 -mr-5">
              YOU GOT THIS!
            </button>
            <button className="bg-gray-200 py-2 px-4 rounded-full transform -rotate-3 shadow-md w-30 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-blue-400 hover:shadow-lg font-arial">
              Press when FruStaTed
            </button>
            <button className="bg-gray-200 py-2 px-4 rounded-full transform rotate-1 shadow-md w-50 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-yellow-400 hover:shadow-lg font-arial ml-10 -mr-5">
              Good Luck Button
            </button>
            <button className="bg-gray-200 py-2 px-5 rounded-full transform -rotate-3 shadow-md w-75 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-purple-400 hover:shadow-lg font-arial -mr-4">
              All We Have Is Now.
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full">
            {/* Cards */}
            {/* Upcoming Events Card */}
            <div className="col-span-2 row-span-1 rounded-xl bg-pink-400 flex flex-col items-start justify-start shadow-md relative overflow-hidden">
              <img
                src={plannerImage}
                alt="Upcoming Events"
                className="w-full h-60 object-cover rounded-t-xl"
              />
              <div className=" w-full">
                <h2 className="text-lg font-semibold text-black mt-2 ml-2 ">
                  <a href="/upcoming-events">Upcoming Events & Calendar</a>
                </h2>
                <p className="text-sm text-gray-750 ml-2">
                  Your personal time machine, letting you peek (and prepare for)
                  the future.
                </p>
              </div>
            </div>

            {/* To-Do List Card */}
            <div
              className="col-span-1 row-span-1 rounded-xl bg-pink-400 p-2 flex flex-col items-start justify-start text-black text-2xl font-semibold shadow-md"
              style={{
                backgroundColor: "#fefefd",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%238c8c8c' fill-opacity='0.4'%3E%3Cpath opacity='.4' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2
                className="text-2xl italic mb-4"
                style={{
                  backgroundColor: "rgba(219, 172, 255, 0.88)", // Example with a light pink background
                }}
              >
                To-Do List
              </h2>

              <div className="flex flex-col space-y-2 w-full">
                {tasks.map((task, index) => (
                  <label key={index} className="flex items-center text-3xl">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(index)}
                    />
                    <span className={task.completed ? "line-through" : ""}>
                      {task.text}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex mt-4 w-full">
                <input
                  type="text"
                  className="p-1 rounded-l-lg w-full text-black text-sm"
                  placeholder="Add a new task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                  className="bg-purple-300 text-black p-1 rounded-r-lg ml-2 text-sm"
                  onClick={addTask}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Vision Board Card */}
            <div className="col-span-1 row-span-1 rounded-xl bg-blue-400 flex flex-col items-start justify-start shadow-md relative overflow-hidden">
              <img
                src={visionImage}
                alt="Vision Board"
                className="w-full h-60 object-cover rounded-t-xl"
              />
              <div className=" w-full">
            
                  <h2 className="text-lg font-semibold text-black mt-2 ml-2">
                    <a href="/vision-board">Vision Board</a>
                  </h2>
                
                <p className="text-sm text-gray-750 ml-2">
                  Where dreams take shape and aspirations get a visual upgrade.
                </p>
              </div>
            </div>
            {/* Projects Card */}
            <div className="col-span-2 row-span-1 rounded-xl bg-yellow-400 flex flex-col items-start justify-start shadow-md relative overflow-hidden">
              <img
                src={projectImage}
                alt="Vision Board"
                className="w-full h-60 object-cover rounded-t-xl"
              />
              <div className=" w-full">
                <h2 className="text-lg font-semibold text-black  mt-2 ml-2 ">
                  Projects
                </h2>
                <p className="text-sm text-gray-750 ml-2">
                  From brainstorm to breakthrough, this is where ideas become
                  reality (or at least get a good try).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
