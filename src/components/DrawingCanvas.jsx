import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [drawings, setDrawings] = useState(() => {
    const savedDrawings = localStorage.getItem('drawings');
    return savedDrawings ? JSON.parse(savedDrawings) : [];
  });
  const [currentColor, setCurrentColor] = useState('#000000');
  const [artistName, setArtistName] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const canvasContainerRef = useRef(null);
  const [currentLineSize, setCurrentLineSize] = useState(4);
  const [canvasState, setCanvasState] = useState(null);

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
    localStorage.setItem('drawings', JSON.stringify(drawings));
  }, [drawings]);

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

  const stopDrawing = () => {
    if (isDrawing) {
      context.closePath();
      setIsDrawing(false);
      setCanvasState(canvasRef.current.toDataURL());
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
  };

  const saveDrawing = () => {
    if (!artistName.trim()) {
      setShowNameError(true);
      return;
    }
    setShowNameError(false);
    const imageData = canvasRef.current.toDataURL();
    const newDrawing = { 
      image: imageData, 
      artist: artistName.trim(),
      date: new Date().toISOString() // Optional: add date for sorting/display
    };
    
    setDrawings(prev => [...prev, newDrawing]);
    clearCanvas();
    setArtistName('');
  };

  const clearAllDrawings = () => {
    if (window.confirm('Are you sure you want to clear all drawings?')) {
      setDrawings([]);
      localStorage.removeItem('drawings');
    }
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

        <div className="flex flex-col items-center gap-8">
          <div 
            ref={canvasContainerRef}
            className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4"
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
            <div className="w-full max-w-4xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Saved Drawings
                </h3>
                <button
                  onClick={clearAllDrawings}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {drawings.map((drawing, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4"
                  >
                    <img
                      src={drawing.image}
                      alt={`Drawing ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        by: {drawing.artist}
                      </p>
                      {drawing.date && (
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">
                          {new Date(drawing.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 