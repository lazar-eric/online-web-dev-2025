
const request = async (path, method = 'GET', body) => {
  try {
    const token = window.localStorage.getItem('token');

    // Send request to the API 
    const response = await fetch(`http://localhost:4000${path}`, {
      // Method 
      method,

      // Body 
      body: body ? JSON.stringify(body) : null,

      // Headers
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      }
    });

    // Parse the response to a javascript object 
    const json = await response.json();

    console.log('Response', response, json);

    return {
      status: response.status,

      ...json
    };
  } catch (error) {
    console.log('Response error', error, error.status, error.message);

    return {
      status: error.status,
      message: error.message
    };
  }
};

export const API = {
  get: (path) => request(path),
  post: (path, body) => request(path, 'POST', body),
  put: (path, body) => request(path, 'PUT', body),
  delete: (path) => request(path, 'DELETE')
};
