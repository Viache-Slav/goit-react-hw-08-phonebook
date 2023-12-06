import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAsync } from '../../redux/contactsSlice';
import css from './contactForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const notifyError = (errorMessage) => {
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const contacts = useSelector((state) => state.contacts.data);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !number) {
      notifyError('Please provide both name and number.');
      return;
    }

    if (contacts.some((contact) => contact.name === name || contact.number === number)) {
      notifyError('Contact with the same name or number already exists.');
      return;
    }

    dispatch(addContactAsync({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <h2>Name</h2>
        <input className={css.input}
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter name'
        />{' '}

        <h2>Number</h2>
        <input className={css.input}
          type="tel"
          name="number"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder='Enter number'
        />{' '}

        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>

      <ToastContainer />
    </>
  );
};

export default ContactForm;


