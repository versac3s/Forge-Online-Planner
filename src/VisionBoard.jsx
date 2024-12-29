import { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";

function VisionBoard() {
  const [canvasStyle, setCanvasStyle] = useState({
    backgroundColor: "#ffffff",
  });
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const addImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = {
        type: "image",
        src: URL.createObjectURL(file),
        id: Date.now(),
        style: {
          width: 150,
          height: 150,
        },
        position: { x: 50, y: 50 },
      };
      setElements([...elements, newImage]);
    }
  };

  const addText = () => {
    const newText = {
      type: "text",
      content: "Double click to edit",
      id: Date.now(),
      style: {
        fontSize: 16,
        color: "#000000",
        width: 200,
        height: 40,
      },
      position: { x: 50, y: 50 },
    };
    setElements([...elements, newText]);
  };

  const handleBackgroundColor = (e) => {
    setCanvasStyle({ ...canvasStyle, backgroundColor: e.target.value });
  };

  const handleTextEdit = (key, value, elementId) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === elementId
          ? { ...el, style: { ...el.style, [key]: value } }
          : el
      )
    );
  };

  const handleTextChange = (e, elementId) => {
    const text = e.target.textContent;
    setElements(prev =>
      prev.map(el =>
        el.id === elementId
          ? { ...el, content: text }
          : el
      )
    );
  };

  const handleMouseDown = (e, element, action) => {
    if (e.button !== 0) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSelectedElementId(element.id);
    setStartPos({ x: x - element.position.x, y: y - element.position.y });

    if (action === "drag") {
      setIsDragging(true);
    } else if (action === "resize") {
      setIsResizing(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging && !isResizing) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setElements((prev) =>
        prev.map((el) => {
          if (el.id === selectedElementId) {
            if (isDragging) {
              return {
                ...el,
                position: {
                  x: Math.max(0, Math.min(x - startPos.x, canvas.offsetWidth - el.style.width)),
                  y: Math.max(0, Math.min(y - startPos.y, canvas.offsetHeight - el.style.height)),
                },
              };
            } else if (isResizing) {
              const newWidth = Math.max(50, x - el.position.x);
              const newHeight = Math.max(30, y - el.position.y);
              return {
                ...el,
                style: {
                  ...el.style,
                  width: newWidth,
                  height: newHeight,
                },
              };
            }
          }
          return el;
        })
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, selectedElementId, startPos]);

  const downloadImage = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const mainCanvas = canvasRef.current;
      
      // Set canvas dimensions
      canvas.width = mainCanvas.offsetWidth;
      canvas.height = mainCanvas.offsetHeight;
      
      // Draw background
      ctx.fillStyle = canvasStyle.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw each element
      for (const element of elements) {
        if (element.type === 'image') {
          const img = new Image();
          img.src = element.src;
          await new Promise((resolve) => {
            img.onload = resolve;
          });
          ctx.drawImage(
            img,
            element.position.x,
            element.position.y,
            element.style.width,
            element.style.height
          );
        } else if (element.type === 'text') {
          ctx.font = `${element.style.fontSize}px Arial`;
          ctx.fillStyle = element.style.color;
          ctx.fillText(
            element.content,
            element.position.x,
            element.position.y + element.style.fontSize
          );
        }
      }
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'vision-board.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Vision Board</h1>
        </div>

        {/* Toolbar */}
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Background:</label>
              <input
                type="color"
                onChange={handleBackgroundColor}
                className="w-8 h-8 rounded cursor-pointer"
              />
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <button
              onClick={addText}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Text
            </button>
            <label className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer">
              Add Image
              <input
                type="file"
                accept="image/*"
                onChange={addImage}
                className="hidden"
              />
            </label>
            <button
              onClick={downloadImage}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            {selectedElementId && elements.find(el => el.id === selectedElementId)?.type === "text" && (
              <>
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    onChange={(e) => handleTextEdit("color", e.target.value, selectedElementId)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <input
                    type="number"
                    placeholder="Font Size"
                    onChange={(e) => handleTextEdit("fontSize", parseInt(e.target.value, 10), selectedElementId)}
                    className="w-20 px-2 py-1 border rounded"
                    min="8"
                    max="72"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="p-6">
          <div
            ref={canvasRef}
            className="relative border-2 border-dashed border-gray-300 rounded-lg w-full h-[600px]"
            style={canvasStyle}
          >
            {elements.map((element) => (
              <div
                key={element.id}
                className={`absolute ${
                  selectedElementId === element.id ? "ring-2 ring-blue-500" : ""
                }`}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  width: element.style.width,
                  height: element.style.height,
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={(e) => handleMouseDown(e, element, "drag")}
              >
                {element.type === "image" ? (
                  <>
                    <img
                      src={element.src}
                      alt="uploaded"
                      className="w-full h-full object-contain"
                      draggable="false"
                    />
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-sm cursor-se-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleMouseDown(e, element, "resize");
                      }}
                    />
                  </>
                ) : (
                  <div className="relative w-full h-full group">
                    <textarea
                      value={element.content}
                      onChange={(e) => handleTextChange(e, element.id)}
                      className="w-full h-full p-2 resize-none bg-transparent focus:outline-none"
                      style={{
                        fontSize: `${element.style.fontSize}px`,
                        color: element.style.color,
                        border: 'none',
                        overflow: 'hidden'
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-sm cursor-se-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleMouseDown(e, element, "resize");
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisionBoard;