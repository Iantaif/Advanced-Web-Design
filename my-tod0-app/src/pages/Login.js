import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://awd-2023.azurewebsites.net/Auth/login', {
        username, 
        password  
      });

      // Save access token 
      const { token } = response.data; 
      localStorage.setItem('accessToken', token);

      // Save refresh token
      const { refresh_token } = response.data;
      localStorage.setItem('refreshToken', refresh_token);

      // Redirect to home
      navigate('/todoapp');
      
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  }
  return (
    <div>
        <label htmlFor="">UserName</label>
      <input 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
            <label htmlFor="">PassWord</label>

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
  
    }


    export default LoginPage;
