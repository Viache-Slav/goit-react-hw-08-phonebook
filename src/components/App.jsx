import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { fetchContacts } from '../redux/contactsSlice';
import store from '../redux/store';
import css from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.contacts.status);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading contacts.</p>;
  }

  return (
    <Provider store={store}>
      <div className={css.body}>
        <h1>Phone Book</h1>
        <ContactForm />

        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;


