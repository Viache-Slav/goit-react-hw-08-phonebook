// App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './Navigation/Navigation';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Register from './Register/Register';
import Login from './Login/Login';
import { fetchContacts } from '../redux/contactsSlice';
// import store from '../redux/store';
import css from './app.module.css';
import UserMenu from './UserMenu/UserMenu';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.contacts.status);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        dispatch(fetchContacts());
      } catch (error) {
        console.error("Error loading contacts:", error.message);
      }
    };
  
    if (user) {
      loadContacts();
    }
  }, [dispatch, user]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading contacts.</p>;
  }

  return (
    <div className={css.body}>
      <h1>Phone Book</h1>
      <Navigation />
      {user && <UserMenu />} {/* Отображаем UserMenu, если пользователь аутентифицирован */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={user ? (
          <>
            <ContactForm />
            <h2>Contacts</h2>
            <Filter />
            <ContactList />
          </>
        ) : (
          <Navigate to="/login" replace />
        )} />
      </Routes>
    </div>
  );
};

export default App;


