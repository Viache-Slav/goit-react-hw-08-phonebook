// UserMenu.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      // Отправляем запрос на сервер для разрушения токена
      await axios.post('/auth/logout'); // Предполагаемый API-метод для выхода пользователя

      // После успешного разрушения токена
      dispatch(logout());
    } catch (error) {
      // Обрабатываем ошибку
      console.error('Logout failed:', error.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <div>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
