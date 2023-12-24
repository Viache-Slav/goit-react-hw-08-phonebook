// Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/userSlice';
import axios from 'axios';

axios.defaults.baseURL = 'https://goit-task-manager.herokuapp.com';

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Отправляем запрос на сервер для регистрации
      const response = await axios.post('https://goit-task-manager.herokuapp.com/users/signup', { 
        name, 
        email, 
        password 
      });

      // const response = await axios.post('/users/signup', { name, email, password });

      // Обрабатываем успешный ответ
      dispatch(register({ email, token: response.data.token }));
    } catch (error) {
        // Проверяем, является ли ошибка ошибкой MongoDB с кодом 11000
      if (error.response?.data?.code === 11000) {
        console.error('Registration failed: Email is already registered.');
      } else {
        console.error('Registration failed:', error.response?.data || 'Registration failed');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
      />

      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />

      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;


