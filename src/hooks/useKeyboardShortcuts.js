import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if Cmd/Ctrl is pressed
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'h':
            e.preventDefault();
            navigate('/');
            break;
          case 'w':
            e.preventDefault();
            navigate('/work');
            break;
          case 'b':
            e.preventDefault();
            navigate('/blog');
            break;
          case 'a':
            e.preventDefault();
            navigate('/about');
            break;
          case 'r':
            e.preventDefault();
            window.open('/LiamOBrien_2025_resume.pdf', '_blank');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);
} 