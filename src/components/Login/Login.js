// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';
import axios from 'axios';

axios.defaults.baseURL = 'https://goit-task-manager.herokuapp.com';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/users/login', { email, password });
      dispatch(login({ email, token: response.data.token }));

    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'Authentication failed');
    }
  }; 

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => 
        setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => 
        setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;