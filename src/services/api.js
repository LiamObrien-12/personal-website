const API_URL = 'http://localhost:5000/api';

let adminToken = null;

export const fetchDrawings = async () => {
  try {
    const response = await fetch(`${API_URL}/drawings`);
    if (!response.ok) throw new Error('Failed to fetch drawings');
    return response.json();
  } catch (error) {
    console.error('Error fetching drawings:', error);
    throw error;
  }
};

export const saveDrawing = async (drawingData) => {
  try {
    const response = await fetch(`${API_URL}/drawings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drawingData),
    });
    if (!response.ok) throw new Error('Failed to save drawing');
    return response.json();
  } catch (error) {
    console.error('Error saving drawing:', error);
    throw error;
  }
};

export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  adminToken = data.token;
  return data;
};

export const deleteDrawing = async (id) => {
  if (!adminToken) throw new Error('Not authorized');
  
  const response = await fetch(`${API_URL}/drawings/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
  });
  if (!response.ok) throw new Error('Failed to delete drawing');
  return response.json();
}; 