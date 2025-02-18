import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchDrawings, saveDrawing as saveDrawingApi, deleteDrawing } from '../services/api';
import AdminLogin from './AdminLogin';

const COLORS = [
  '#000000', // Black
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFA500', // Orange
  '#800080', // Purple
];

const LINE_SIZES = [
  { size: 2, label: 'S' },
  { size: 4, label: 'M' },
  { size: 8, label: 'L' },
  { size: 12, label: 'XL' },
];

export default function DrawingCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [drawings, setDrawings] = useState([]);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [artistName, setArtistName] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const canvasContainerRef = useRef(null);
  const [currentLineSize, setCurrentLineSize] = useState(4);
  const [canvasState, setCanvasState] = useState(null);
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDrawingIndex, setCurrentDrawingIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Only set white background if it's the first initialization
    if (!canvasState) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      // Restore previous drawing when changing line size
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      image.src = canvasState;
    }
    
    // Update drawing settings
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentLineSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = currentColor;
    ctx.shadowBlur = 1;
    setContext(ctx);
  }, [currentLineSize, canvasState]);

  useEffect(() => {
    if (context) {
      context.strokeStyle = currentColor;
      context.fillStyle = currentColor;
      context.shadowColor = currentColor;
      context.lineWidth = currentLineSize;
    }
  }, [currentColor, currentLineSize]);

  useEffect(() => {
    const loadDrawings = async () => {
      try {
        const fetchedDrawings = await fetchDrawings();
        setDrawings(fetchedDrawings);
      } catch (error) {
        console.error('Failed to load drawings:', error);
      }
    };
    loadDrawings();
  }, []);

  const drawDot = (x, y) => {
    context.beginPath();
    context.arc(x, y, currentLineSize / 2, 0, Math.PI * 2);
    context.fillStyle = currentColor;
    context.fill();
    context.closePath();
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCoordinates(e);
    setIsDrawing(true);
    
    // Draw initial dot
    drawDot(offsetX, offsetY);
    
    // Start new path for line drawing
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const updateCursorPosition = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(e);
    
    // Use quadratic curve for smoother lines
    const lastPoint = { x: offsetX, y: offsetY };
    const xc = (lastPoint.x + offsetX) / 2;
    const yc = (lastPoint.y + offsetY) / 2;
    
    context.quadraticCurveTo(lastPoint.x, lastPoint.y, xc, yc);
    context.stroke();
    
    // Save canvas state after each stroke
    setCanvasState(canvasRef.current.toDataURL());
    
    // Update cursor
    updateCursorPosition(e);
  };

  const saveToHistory = () => {
    const imageData = canvasRef.current.toDataURL();
    setDrawingHistory(prev => [...prev.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex(prev => prev + 1);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      context.closePath();
      setIsDrawing(false);
      setCanvasState(canvasRef.current.toDataURL());
      saveToHistory();
    }
  };

  const getCoordinates = (e) => {
    if (e.touches) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    }
    return {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setCanvasState(null);
    setHistoryIndex(-1);
    setDrawingHistory([]);
  };

  const saveDrawing = async () => {
    if (!artistName.trim()) {
      setShowNameError(true);
      return;
    }
    
    try {
      const imageData = canvasRef.current.toDataURL();
      const newDrawing = await saveDrawingApi({
        image: imageData,
        artist: artistName.trim()
      });
      
      setDrawings(prev => [newDrawing, ...prev]);
      clearCanvas();
      setArtistName('');
    } catch (error) {
      console.error('Failed to save drawing:', error);
      // Optionally add error handling UI
    }
  };

  const clearAllDrawings = () => {
    if (window.confirm('Are you sure you want to clear all drawings?')) {
      setDrawings([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this drawing?')) {
      try {
        await deleteDrawing(id);
        setDrawings(prev => prev.filter(drawing => drawing._id !== id));
      } catch (error) {
        console.error('Failed to delete drawing:', error);
      }
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const imageData = drawingHistory[newIndex];
      const img = new Image();
      img.onload = () => {
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
        setCanvasState(imageData);
      };
      img.src = imageData;
      setHistoryIndex(newIndex);
    } else {
      // If no history, clear canvas
      clearCanvas();
      setHistoryIndex(-1);
      setDrawingHistory([]);
    }
  };

  // Add navigation functions
  const nextDrawing = () => {
    setCurrentDrawingIndex((prev) => 
      prev === drawings.length - 1 ? 0 : prev + 1
    );
  };

  const previousDrawing = () => {
    setCurrentDrawingIndex((prev) => 
      prev === 0 ? drawings.length - 1 : prev - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextDrawing();
    }

    if (isRightSwipe) {
      previousDrawing();
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
  };

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">UI</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Draw something and share it with the community
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          <div 
            ref={canvasContainerRef}
            className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 min-w-[400px]"
          >
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="bg-white rounded-lg touch-none cursor-none"
                onMouseDown={startDrawing}
                onMouseMove={(e) => {
                  updateCursorPosition(e);
                  draw(e);
                }}
                onMouseUp={stopDrawing}
                onMouseLeave={() => {
                  stopDrawing();
                  setCursorPosition({ x: -100, y: -100 }); // Move cursor out of view
                }}
                onMouseEnter={(e) => updateCursorPosition(e)}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              
              {/* Custom cursor */}
              <div 
                className="pointer-events-none absolute w-4 h-4 rounded-full transition-transform duration-75"
                style={{
                  backgroundColor: currentColor,
                  border: '2px solid white',
                  boxShadow: '0 0 0 1px black',
                  left: `${cursorPosition.x}px`,
                  top: `${cursorPosition.y}px`,
                  transform: 'translate(-50%, -50%)',
                  opacity: cursorPosition.x < 0 ? 0 : 1
                }}
              />
            </div>
            
            {/* Tools container */}
            <div className="mt-4 space-y-4">
              {/* Color picker */}
              <div className="flex justify-center gap-2 mb-4">
                {COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      currentColor === color ? 'border-gray-400' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Line size picker */}
              <div className="flex justify-center gap-2 mb-4">
                {LINE_SIZES.map(({ size, label }) => (
                  <button
                    key={size}
                    onClick={() => setCurrentLineSize(size)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                      ${currentLineSize === size 
                        ? 'border-gray-400 bg-gray-100 dark:bg-gray-700' 
                        : 'border-transparent bg-white dark:bg-gray-800'
                      }`}
                  >
                    <div 
                      className="rounded-full bg-current"
                      style={{ 
                        width: `${size}px`, 
                        height: `${size}px`,
                        backgroundColor: currentColor 
                      }} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name input */}
            <div className="mt-4 mb-4">
              <input
                type="text"
                value={artistName}
                onChange={(e) => {
                  setArtistName(e.target.value);
                  if (showNameError) setShowNameError(false);
                }}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black dark:bg-neutral-700 dark:border-neutral-600"
              />
              {showNameError && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter your name before saving
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={undo}
                disabled={historyIndex < 0}
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg 
                  hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Undo
              </button>
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={saveDrawing}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
            </div>
          </div>

          {drawings.length > 0 && (
            <div className="w-full lg:w-[400px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Saved Drawings
                </h3>
                <div className="flex gap-2">
                  {!isAdmin ? (
                    <button
                      onClick={() => setShowAdminLogin(true)}
                      className="px-4 py-2 text-sm bg-neutral-200 dark:bg-neutral-700 
                        text-neutral-900 dark:text-neutral-100 rounded-lg 
                        hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                    >
                      Admin Login
                    </button>
                  ) : (
                    <button
                      onClick={clearAllDrawings}
                      className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg 
                        hover:bg-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
              
              <div className="relative bg-neutral-900 rounded-lg shadow-lg p-4">
                <div 
                  className="relative aspect-square"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={drawings[currentDrawingIndex].image}
                    alt={`Drawing ${currentDrawingIndex + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                    draggable="false"
                  />
                  <button
                    onClick={previousDrawing}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextDrawing}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    →
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(drawings[currentDrawingIndex]._id)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full 
                        hover:bg-red-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="mt-2 flex justify-between items-center text-neutral-400">
                  <p className="text-sm">
                    by: {drawings[currentDrawingIndex].artist}
                  </p>
                  {drawings[currentDrawingIndex].date && (
                    <p className="text-xs">
                      {new Date(drawings[currentDrawingIndex].date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="mt-2 flex justify-center">
                  {drawings.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDrawingIndex(index)}
                      className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                        index === currentDrawingIndex 
                          ? 'bg-white' 
                          : 'bg-neutral-600 hover:bg-neutral-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}
    </section>
  );
} 