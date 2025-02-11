export function DevToolbar() {
  const enableToolbar = () => {
    document.cookie = '__vercel_toolbar=1; path=/';
    window.location.reload();
  };

  if (process.env.NODE_ENV === 'development') {
    return (
      <button
        onClick={enableToolbar}
        className="fixed bottom-4 right-4 bg-primary-200 dark:bg-primary-700 text-neutral-900 dark:text-neutral-100 px-4 py-2 rounded-2xl b2 font-medium transition-colors hover:bg-primary-300 hover:dark:bg-primary-600"
      >
        Enable Dev Toolbar
      </button>
    );
  }

  return null;
} 