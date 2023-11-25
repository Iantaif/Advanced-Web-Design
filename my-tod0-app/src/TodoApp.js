import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAuthenticated = localStorage.getItem('accessToken') !== null;

        if (!isAuthenticated) {
          window.location.href = '/login';
        } else {
          try {
            const response = await axios.get('https://awd-2023.azurewebsites.net/Auth/me', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            });

            // Assuming the server response is a JSON string, parse it into an object
            const userData = JSON.parse(response.data);

            setUserInfo(userData);
          } catch (error) {
            // Handle the case where the token has expired
            if (error.response && error.response.status === 401) {
              await refreshAccessToken();
              // Retry the original request
              const response = await axios.get('https://awd-2023.azurewebsites.net/Auth/me', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
              });

              // Parse the response data as JSON
              const userData = JSON.parse(response.data);

              setUserInfo(userData);
            } else {
              console.error('Error fetching user information:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchData();
  }, []);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      const refreshResponse = await axios.post(
        'https://awd-2023.azurewebsites.net/Auth/refresh-token',
        {
          refreshToken,
        }
      );

      const newAccessToken = refreshResponse.data.accessToken;

      // Update the stored access token
      localStorage.setItem('accessToken', newAccessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);

      // Handle the case where the refresh token is also expired
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  };

  const handleLogout = () => {
    // Placeholder for your logout logic (clear tokens, etc.)
    // Replace the following line with your actual logout logic
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Todo App</h2>
      {userInfo && (
        <div>
          <p>Welcome, {userInfo.username}!</p>
          <p>Email: {userInfo.email}</p>
          {/* Display other user information */}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
      {/* Your Todo App content goes here */}
    </div>
  );
};

export default TodoApp;
