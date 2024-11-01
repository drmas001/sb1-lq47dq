import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabase';

export const fetchTools = createAsyncThunk(
  'tools/fetchTools',
  async () => {
    const { data, error } = await supabase
      .from('tools')
      .select('*');
    if (error) throw error;
    return data;
  }
);

export const fetchToolsByRepair = createAsyncThunk(
  'tools/fetchToolsByRepair',
  async (repairId: string) => {
    const { data, error } = await supabase
      .from('repair_tools')
      .select('*, tools(*)')
      .eq('repair_id', repairId);
    if (error) throw error;
    return data.map(item => item.tools);
  }
);

const toolSlice = createSlice({
  name: 'tools',
  initialState: {
    tools: [],
    repairTools: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload;
      })
      .addCase(fetchTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchToolsByRepair.fulfilled, (state, action) => {
        state.repairTools[action.meta.arg] = action.payload;
      });
  },
});

export default toolSlice.reducer;