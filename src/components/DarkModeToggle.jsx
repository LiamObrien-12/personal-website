import { useTheme } from '../providers/ThemeProvider';

export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-primary-200 dark:bg-primary-700 text-neutral-900 dark:text-neutral-100"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
} 