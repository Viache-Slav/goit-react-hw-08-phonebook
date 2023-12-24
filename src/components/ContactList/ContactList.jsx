// ContactList.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAsync } from '../../redux/contactsSlice';
import css from './contactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.data);
  const filter = useSelector((state) => state.filter.filter);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContactAsync(contactId));
  };

  return (
    <>
      {filteredContacts.map((contact) => (
        <div key={contact.id}>
          <span className={css.mobileIcon}>📳</span>
          <span className={css.name}>{`${contact.name}: `}</span>
          <span className={css.number}>{contact.number}</span>
          <button className={css.button} onClick={() => handleDeleteContact(contact.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default ContactList;




