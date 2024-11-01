import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../services/supabase';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: false,
    notifications: true,
    language: 'en',
    loading: false,
    error: null,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  toggleNotifications,
  setLanguage,
  setLoading,
  setError,
} = settingsSlice.actions;

export default settingsSlice.reducer;