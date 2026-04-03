
export const getUserId = () => {
  return localStorage.getItem('x-user-id');
};

export const setUserId = (id: string) => {
  if (id) {
    localStorage.setItem('x-user-id', id);
  }
};

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const userId = getUserId();
  const headers = new Headers(options.headers || {});
  
  console.log(`[${new Date().toISOString()}] apiFetch calling: ${url}`, { userId, method: options.method || 'GET' });
  
  if (userId) {
    headers.set('x-user-id', userId);
  }
  
  const response = await fetch(url, { ...options, headers, credentials: 'include' });
  
  const newUserId = response.headers.get('x-user-id');
  if (newUserId) {
    setUserId(newUserId);
  }
  
  return response;
};
