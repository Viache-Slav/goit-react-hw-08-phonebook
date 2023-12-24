// ContactsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const API_BASE_URL = 'https://connections-api.herokuapp.com';

const isContactDuplicate = (contacts, newContact) => {
  return contacts.some(
    (contact) => contact.name === newContact.name || contact.number === newContact.number
  );
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts', async (_, { getState }) => {
    const token = getState().user.token;
    try {
    const response = await axios.get(
      `${API_BASE_URL}/contacts`, { headers: { 'Authorization': `Bearer ${token}` } }
      );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addContactAsync = createAsyncThunk(
  'contacts/addContactAsync', 
  async (contact, { getState, rejectWithValue }) => {
    const state = getState();
    const existingContacts = state.contacts.data;
    const token = state.user.token;

    if (isContactDuplicate(existingContacts, contact)) {
      return rejectWithValue('Contact with the same name or number already exists');
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/contacts`, contact, { headers: { 'Authorization': `Bearer ${token}` } }
        );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContactAsync', 
  async (contactId, { getState }) => {
    const token = getState().user.token;

    try {
      await axios.delete(
        `${API_BASE_URL}/contacts/${contactId}`, { headers: { 'Authorization': `Bearer ${token}` } }
        );
      return contactId;
    } catch (error) {
      throw error;
    }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(contact => contact.id !== action.payload);
      });
  },
});

export const contactsReducer = contactsSlice.reducer;



