import { useState } from 'react';
import { loginAdmin } from '../services/api';

export default function AdminLogin({ onLogin, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin({ username, password });
      onLogin();
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Admin Login
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black 
                dark:bg-neutral-700 dark:border-neutral-600"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black 
                dark:bg-neutral-700 dark:border-neutral-600"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded-lg 
              hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
} 