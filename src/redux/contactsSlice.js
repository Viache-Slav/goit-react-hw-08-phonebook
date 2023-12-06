import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const isContactDuplicate = (contacts, newContact) => {
  return contacts.some(
    (contact) => contact.name === newContact.name || contact.number === newContact.number
  );
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts', async () => {
  try {
    const response = await axios.get('https://656b4b2fdac3630cf727f3f3.mockapi.io/contacts');
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

    if (isContactDuplicate(existingContacts, contact)) {
      return rejectWithValue('Contact with the same name or number already exists');
    }

    try {
      const response = await axios.post('https://656b4b2fdac3630cf727f3f3.mockapi.io/contacts', contact);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContactAsync', async (contactId) => {
  try {
    await axios.delete(`https://656b4b2fdac3630cf727f3f3.mockapi.io/contacts/${contactId}`);
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



