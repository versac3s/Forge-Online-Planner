import { useState } from "react";
import "./Projects.css";

// Array of random image URLs
const imageUrls = [
  "https://i.pinimg.com/736x/59/2b/62/592b623cfeaf521fb83097be3d96e4ad.jpg",
  "https://i.pinimg.com/736x/e6/3c/51/e63c512b1d67f660d4d81c4391924f26.jpg",
  "https://i.pinimg.com/736x/af/06/51/af06511c065796f4009024346de8ca40.jpg",
  "https://i.pinimg.com/736x/cc/8e/21/cc8e215eeb13b399dd12c55ffb053c79.jpg",
  "https://i.pinimg.com/736x/ac/82/42/ac8242177810a42c27b0fc8dd6c82647.jpg",
  "https://i.pinimg.com/736x/9e/2a/34/9e2a340fb16a8017d02a6038604dde6b.jpg",
  "https://i.pinimg.com/736x/ea/7b/77/ea7b77442cac66892d83b5bac03fd8ad.jpg",
  "https://i.pinimg.com/736x/c3/d4/bf/c3d4bf568d629aed1f0973d48e511d3b.jpg",
  "https://i.pinimg.com/736x/c6/dc/87/c6dc8792b2b7c0f1f5bb971da5d12c39.jpg",
  "https://i.pinimg.com/736x/67/01/d6/6701d6f479c0ad3018c1a9674d011be9.jpg",
  "https://i.pinimg.com/736x/1d/7c/2d/1d7c2d83cc0c84115e1c0ba763fc7952.jpg",
  "https://i.pinimg.com/736x/74/05/ed/7405ed216dbbb73422f957ad61c69418.jpg",
];

const Projects = () => {
  const [notebooks, setNotebooks] = useState([
    {
      id: 1,
      title: "Project 1",
      details: "",
      image: imageUrls[0], // Initial image
    },
  ]);
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  const addNotebook = () => {
    // Create a shuffled copy of the imageUrls array
    const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);

    // Remove the last used image (if any) from the shuffled array to prevent repetition
    const availableImages = shuffledImages.filter(
      (image) => !notebooks.some((notebook) => notebook.image === image)
    );

    // Pick an image from the filtered list
    const randomImage = availableImages[0] || imageUrls[0]; // Default to the first image if no unique image is found

    setNotebooks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Project ${prev.length + 1}`,
        details: "",
        image: randomImage,
      },
    ]);
  };

  const updateNotebook = (id, updatedNotebook) => {
    setNotebooks((prev) =>
      prev.map((notebook) => (notebook.id === id ? updatedNotebook : notebook))
    );
    setSelectedNotebook(null);
  };

  return (
    <div className="projects-container">
      <h1 className="heading">Your Projects</h1>
      <div className="notebooks-grid">
        {notebooks.map((notebook) => (
          <div
            key={notebook.id}
            className="notebook-card col-span-1 row-span-2 rounded-xl bg-yellow-400 flex flex-col items-start justify-start shadow-md relative overflow-hidden"
            onClick={() => setSelectedNotebook(notebook)}
          >
            <img
              src={notebook.image}
              alt={notebook.title}
              className="w-full h-60 object-cover rounded-t-xl"
            />
            <div className="w-full p-2">
              <h2 className="text-lg font-semibold text-black mt-2">
                {notebook.title}
              </h2>
            </div>
          </div>
        ))}
        <button className="add-notebook-button" onClick={addNotebook}>
          +
        </button>
      </div>

      {selectedNotebook && (
        <div className="notebook-popup">
          <div className="popup-content">
            <input
              className="title-input"
              type="text"
              value={selectedNotebook.title}
              onChange={(e) =>
                setSelectedNotebook({
                  ...selectedNotebook,
                  title: e.target.value,
                })
              }
              placeholder="Enter project title..."
            />
            <textarea
              value={selectedNotebook.details}
              onChange={(e) =>
                setSelectedNotebook({
                  ...selectedNotebook,
                  details: e.target.value,
                })
              }
              placeholder="Type your project details here..."
            ></textarea>
            <button
              className="save-button"
              onClick={() =>
                updateNotebook(selectedNotebook.id, selectedNotebook)
              }
            >
              Save
            </button>
            <button
              className="close-button"
              onClick={() => setSelectedNotebook(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
