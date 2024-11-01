import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabase';

export const fetchRepairs = createAsyncThunk(
  'repairs/fetchRepairs',
  async () => {
    const { data, error } = await supabase
      .from('repairs')
      .select('*');
    if (error) throw error;
    return data;
  }
);

const repairSlice = createSlice({
  name: 'repairs',
  initialState: {
    repairs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepairs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepairs.fulfilled, (state, action) => {
        state.loading = false;
        state.repairs = action.payload;
      })
      .addCase(fetchRepairs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default repairSlice.reducer;