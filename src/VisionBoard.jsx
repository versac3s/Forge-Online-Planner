import { useState, useRef } from 'react';
import { Image, Type, Palette, Grid, Trash2, Plus } from 'lucide-react';

const VisionBoard = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [elements, setElements] = useState([]);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(2);
  const [gridCells, setGridCells] = useState(Array(4).fill(null));
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const draggedElementRef = useRef(null);

  const tools = [
    { id: 'image', icon: Image, label: 'Upload Image' },
    { id: 'text', icon: Type, label: 'Add Text' },
    { id: 'background', icon: Palette, label: 'Background' },
    { id: 'grid', icon: Grid, label: 'Toggle Grid' }
  ];

  const handleImageUpload = (event, cellIndex = null) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (showGrid && cellIndex !== null) {
          // Add to grid cell
          const newGridCells = [...gridCells];
          newGridCells[cellIndex] = e.target.result;
          setGridCells(newGridCells);
        } else {
          // Add as draggable element
          const newElement = {
            id: Date.now(),
            type: 'image',
            x: 50,
            y: 50,
            width: 200,
            height: 200,
            content: e.target.result,
          };
          setElements([...elements, newElement]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startDragging = (e, elementId) => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    setDragging(true);
    draggedElementRef.current = elementId;
    setStartPos({
      x: e.clientX - element.x,
      y: e.clientY - element.y
    });
  };

  const startResizing = (e, elementId) => {
    e.stopPropagation();
    setResizing(true);
    draggedElementRef.current = elementId;
    setStartPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (dragging && draggedElementRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - startPos.x;
      const y = e.clientY - rect.top - startPos.y;

      setElements(elements.map(el => {
        if (el.id === draggedElementRef.current) {
          return { ...el, x, y };
        }
        return el;
      }));
    }

    if (resizing && draggedElementRef.current) {
      const element = elements.find(el => el.id === draggedElementRef.current);
      if (!element) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      
      setElements(elements.map(el => {
        if (el.id === draggedElementRef.current) {
          return {
            ...el,
            width: Math.max(50, element.width + deltaX),
            height: Math.max(50, element.height + deltaY)
          };
        }
        return el;
      }));
      
      setStartPos({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const stopDragging = () => {
    setDragging(false);
    setResizing(false);
    draggedElementRef.current = null;
  };

  const addElement = (type) => {
    if (type === 'image') {
      fileInputRef.current.click();
      return;
    }

    const newElement = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 50 : 100,
      content: type === 'text' ? 'Double click to edit' : null,
    };
    setElements([...elements, newElement]);
  };

  const deleteElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
  };

  const handleToolClick = (toolId) => {
    setSelectedTool(toolId);
    if (toolId === 'grid') {
      setShowGrid(!showGrid);
      setGridCells(Array(gridSize * gridSize).fill(null));
    } else {
      addElement(toolId);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {/* Left Sidebar */}
      <div className="w-20 bg-white shadow-lg p-2 flex flex-col gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolClick(tool.id)}
            className={`w-full p-3 rounded-lg hover:bg-blue-50 transition-all flex flex-col items-center gap-1
              ${selectedTool === tool.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            <tool.icon className="w-6 h-6" />
            <span className="text-xs">{tool.label}</span>
          </button>
        ))}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-8">
        <div 
          className="bg-white w-full h-[600px] rounded-xl shadow-xl border border-gray-200 relative overflow-hidden"
          style={{ backgroundColor: bgColor }}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        >
          {showGrid ? (
            <div className="absolute inset-0 grid gap-2 p-2" 
                 style={{ 
                   gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                   gridTemplateRows: `repeat(${gridSize}, 1fr)`
                 }}>
              {Array(gridSize * gridSize).fill(null).map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!gridCells[index]) {
                      fileInputRef.current.click();
                      fileInputRef.current.onchange = (e) => handleImageUpload(e, index);
                    }
                  }}
                  className="border-2 border-dashed border-gray-200 rounded-lg relative hover:bg-gray-50 transition-colors"
                >
                  {gridCells[index] ? (
                    <div className="relative group">
                      <img
                        src={gridCells[index]}
                        alt="Grid content"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newGridCells = [...gridCells];
                          newGridCells[index] = null;
                          setGridCells(newGridCells);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            elements.map((element) => (
              <div
                key={element.id}
                className="absolute group cursor-move"
                style={{
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: `${element.width}px`,
                  height: `${element.height}px`,
                }}
                onMouseDown={(e) => startDragging(e, element.id)}
              >
                {/* Resize handle */}
                <div
                  className="absolute bottom-right w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100"
                  style={{ right: -8, bottom: -8 }}
                  onMouseDown={(e) => startResizing(e, element.id)}
                />

                <button
                  onClick={() => deleteElement(element.id)}
                  className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {element.type === 'text' && (
                  <div
                    className="w-full min-h-full p-2 text-gray-800 border border-transparent hover:border-blue-200 rounded"
                    contentEditable
                    suppressContentEditableWarning
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {element.content}
                  </div>
                )}
                {element.type === 'image' && (
                  <img
                    src={element.content}
                    alt="Uploaded content"
                    className="w-full h-full object-cover rounded-lg"
                    draggable="false"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Properties Panel */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Properties</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-500">{bgColor}</span>
          </div>
        </div>

        {showGrid && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grid Size
            </label>
            <select
              value={gridSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setGridSize(newSize);
                setGridCells(Array(newSize * newSize).fill(null));
              }}
              className="w-full p-2 border rounded-lg"
            >
              <option value="2">2 x 2</option>
              <option value="3">3 x 3</option>
              <option value="4">4 x 4</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionBoard;